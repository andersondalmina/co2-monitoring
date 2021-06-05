#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define  RO_CLEAN_AIR_MQ9     (9.799)
#define  MQ9_PIN              (A0)

// Replace with your wifi ssid and wpa2 key
const char* ssid = "Formigheri Network"; 
const char* pass = "0000";

const char* api = "http://192.168.0.8:3333/measurement";
const char* sensorCode = "1A2B";

float r0 = 0.0;
// Two points from the curve of CO and the third value is the slope (inclinacao).
float COCurve[3]  =  {2.3, 0.72, -0.34};

void connect()
{
    Serial.println("Conectando a ");
    Serial.println(ssid);
    WiFi.begin(ssid, pass);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.println("Esperando a conexão");
    }
    Serial.println("WiFi conectada");
}

void sendDataHttp(float data)
{
    if(WiFi.status() != WL_CONNECTED){
        return;
    }
    HTTPClient http;
    char httpData[60];   

    
    http.begin(api);
    http.addHeader("Content-Type", "application/json");
    sprintf(httpData, "{\"sensorCode\":\"%s\",\"value\":%f}", sensorCode, data);
    int httpResponseCode = http.POST(httpData);
    
    http.end();
}

float MQ9GetGasPercentage(float rs_ro_ratio, float *pcurve)
{
  return (pow(10, ( ((log(rs_ro_ratio) - pcurve[1]) / pcurve[2]) + pcurve[0])));
}

float MQ9ResistanceCalculation(float sensorValue)
{
    float sensorVolt = (sensorValue / 1024) * 5.0;
    float r = (5.0 - sensorVolt) / sensorVolt;
    return r;
}

float MQ9Calibration()
{
    float RSair;
    float R0;
    float sensorValue;

    Serial.println("MQ9 a calibrar.\n");

    for (int i = 0; i < 100; i++) { 
        sensorValue = sensorValue + analogRead(MQ9_PIN);
        delay(100);
    }

    sensorValue = sensorValue / 100.0;
    RSair = MQ9ResistanceCalculation(sensorValue);

    R0 = RSair / RO_CLEAN_AIR_MQ9;  

    Serial.println("MQ9 calibrado com sucesso.\n");

    return R0;
}

float MQ9Read(){
    float sensorValue;
    float RSgas;

    for (int i = 0; i < 20; i++){
        sensorValue = sensorValue + analogRead(MQ9_PIN);
        delay(20);
    }

    sensorValue = sensorValue / 20;
    RSgas = MQ9ResistanceCalculation(sensorValue);

    return RSgas / r0;
}


void acionateBuzzer(float data){
  if(data < 1000){
    digitalWrite(D2, LOW);
    return;
  }
  digitalWrite(D2, HIGH);  
}

void setup()
{
    Serial.begin(115200);
    delay(10);
    connect();
    r0 = MQ9Calibration();
}

void loop()
{    
    float CO = MQ9GetGasPercentage(MQ9Read(), COCurve);

    Serial.println(CO);

    if (isnan(CO))
    {
        Serial.println("Falha ao ler do sensor MQ-9!");
        return;
    }
    
        
    // acionateBuzzer(CO);
    // sendDataHttp(CO);
    delay(1000);
}