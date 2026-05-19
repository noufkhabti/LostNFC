#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 5
#define RST_PIN 22

MFRC522 rfid(SS_PIN, RST_PIN);

const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";

String scriptURL =
"https://YOUR_SCRIPT_URL/exec";

void setup() {

  Serial.begin(115200);

  SPI.begin(18, 19, 23);

  rfid.PCD_Init();

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void loop() {

  if (!rfid.PICC_IsNewCardPresent())
    return;

  if (!rfid.PICC_ReadCardSerial())
    return;

  String uid = "";

  for (byte i = 0; i < rfid.uid.size; i++) {

    if (rfid.uid.uidByte[i] < 0x10)
      uid += "0";

    uid += String(rfid.uid.uidByte[i], HEX);

    if (i < rfid.uid.size - 1)
      uid += " ";
  }

  uid.toUpperCase();

  sendUID(uid);

  rfid.PICC_HaltA();

  delay(3000);
}

void sendUID(String uid) {

  if (WiFi.status() != WL_CONNECTED)
    return;

  HTTPClient http;

  String url =
    scriptURL +
    "?action=scan&uid=" +
    uid;

  url.replace(" ", "%20");

  http.begin(url);

  http.GET();

  http.end();
}
