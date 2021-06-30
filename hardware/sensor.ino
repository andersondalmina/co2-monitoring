#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include <ArduinoJson.h>

#include <WebSocketsClient.h>
#include <SocketIOclient.h>

#define  RO_CLEAN_AIR_MQ9     (9.799)
#define  MQ9_PIN              (A0)

// WIFI CONNECTION
const char* ssid = "Formigheri Network"; 
const char* pass = "0000";

// HTTP METHOD
const char* api = "http://192.168.0.5:3333/measurement";

// SOCKET
SocketIOclient socketIO;
const char* host = "192.168.0.5";
const int port = 3333;

// SENSOR MEASUREMENT PARAMETERS
// Two points from the curve of CO and the third value is the slope (inclinacao).
const char* sensorCode = "1A2B";


void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) 
{
    switch(type) {
        case sIOtype_DISCONNECT:
            Serial.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            Serial.printf("[IOc] Connected to url: %s\n", payload);

            // join default namespace (no auto join in Socket.IO V3)

            socketIO.send(sIOtype_CONNECT, "/");
                       // socketIO.send("hiiii");

            
            break;
        case sIOtype_EVENT:
            Serial.printf("[IOc] get event: %s\n", payload);
            break;
        case sIOtype_ACK:
            Serial.printf("[IOc] get ack: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_ERROR:
            Serial.printf("[IOc] get error: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_EVENT:
            Serial.printf("[IOc] get binary: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_ACK:
            Serial.printf("[IOc] get binary ack: %u\n", length);
            hexdump(payload, length);
            break;
    }
}

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

void connectSocket()
{
    socketIO.begin(host, port, "/socket.io/?EIO=4");
    socketIO.onEvent(socketIOEvent);
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

void sendDataSocket(float data)
{
    if(WiFi.status() != WL_CONNECTED){
        return;
    }
    // creat JSON message for Socket.IO (event)
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();
    // add event name
    array.add("data");
    // add payload (parameters) for the event
    JsonObject params = array.createNestedObject();
    params["sensor"] = sensorCode;
    params["value"] = data;
    // JSON to String (serializion)
    String output;
    serializeJson(doc, output);

    socketIO.sendEVENT(output);
}

float ReadAnalogEntry(){
    float sensorValue;

    for (int i = 0; i < 20; i++){
        sensorValue = sensorValue + analogRead(MQ9_PIN);
        delay(20);
    }

    sensorValue = sensorValue / 20;

    return sensorValue;
}

void acionateBuzzer(float data){
  if(data < 250){
    digitalWrite(D7, LOW);
    return;
  }
  digitalWrite(D7, HIGH);  
}

void setup()
{
    Serial.begin(115200);
    pinMode(D7, OUTPUT);
    delay(10);
    connect();
    connectSocket();
}

void loop()
{    
    socketIO.loop();

    float CO = ReadAnalogEntry(); // MQ9GetGasPercentage(MQ9Read(), COCurve);

    Serial.println(CO);

    if (isnan(CO))
    {
        Serial.println("Falha ao ler do sensor MQ-9!");
        return;
    }
    
        
    acionateBuzzer(CO);
    // sendDataHttp(CO);
    sendDataSocket(CO);
    // delay(1000);
}