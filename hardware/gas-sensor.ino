#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
const char* ssid = "Formigheri Network"; // replace with your wifi ssid and wpa2 key
const char* pass = "3862013307";
const char* api = "http://192.168.0.8:3333/measurement";

void connect()
{
    Serial.println("Conectando a ");
    Serial.println(ssid);
    WiFi.begin(ssid, pass);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print("Esperando a conexão");
    }
    Serial.println("");
    Serial.println("WiFi conectada");
}

void sendDataHttp(float data)
{
    if(WiFi.status() != WL_CONNECTED){
        return;
    }
    HTTPClient http;
    char httpData[30];   

    
    http.begin(api);
    http.addHeader("Content-Type", "application/json");
    sprintf(httpData, "{\"value\":%f}", data);
    int httpResponseCode = http.POST(httpData);
    
    free(httpData);
    http.end();
}

/*
float MQ9SensorConvertValue(float data) {
  // ESP2866 A0 lê entre 0 e ~ 3 volts, produzindo um valor correspondente
  // entre 0 e 1024. A equação abaixo irá converter o valor em um valor de tensão.
  float d = ((data * 3) / 1024);
  // convertendo de 10 mv por grau com offset de 500 mV
  // em graus ((voltagem - 500mV) vezes 100)
  return (d - 0.5) * 100;
}
*/

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
}

void loop()
{    
    float sensor_volt;  
    float RS_air; //  Rs in clean air 
    float R0;  // R0 in 1000 ppm LPG 
    float data = analogRead(A0);
    
    if (isnan(data))
    {
        Serial.println("Falha ao ler do sensor MQ-9!");
        return;
    }
    
    sensor_volt = (data/1024)*5.0;
    RS_air = (5.0-sensor_volt)/sensor_volt; // Depend on RL on yor module 
    R0 = RS_air/9.9; // According to MQ9 datasheet table 

    Serial.print("sensor_volt = "); 
    Serial.print(sensor_volt); 
    Serial.println("V");
    
    Serial.print("R0 = "); 
    Serial.println(R0); 
    Serial.print(data);
        
    acionateBuzzer(data);
    // sendDataHttp(data);
    delay(500);
    Serial.println("Esperando...");
    delay(1500);
}