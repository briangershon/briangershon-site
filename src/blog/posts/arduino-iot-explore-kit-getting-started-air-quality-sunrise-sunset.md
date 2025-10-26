---
title: Regional Air Quality with Arduino Explore IoT Kit
date: 2020-09-13
description: Build an appliance that receives air quality and sunrise/sunset information from the cloud. The Arduino Explore IoT Kit includes a wifi-enabled Arduino with a carrier board full of sensors and actuators.
layout: layouts/post.liquid
---


Heroku sponsored an [IoT workshop](https://2020.cascadiajs.com/workshop-iot) at our recent CascadiaJS conference. Participants were sent a free Arduino Explore IoT kit to play with prior to the kit being available publicly.

**Update: The [Arduino Explore IoT kit](https://store.arduino.cc/usa/explore-iot-kit) is now available for purchase.**

The workshop started with a nice introduction to the Arduino and how to connect to the Arduino IoT Cloud by [Ubi de Feo](https://create.arduino.cc/projecthub/ubidefeo). Arduino and Heroku also provided code to help people get started, links are below.

I created my own appliance to receive and display air quality and sunrise/sunset information.

In this article, I'll walk through what the kit contains, how to get started, provide links to example code, discuss some helpful information I found along the way, and wrap up with a Thank You to the workshop organizers.

## What is the Arduino Explore IoT Kit?

The kit is:

- an **MKR WIFI 1010 Arduino** that supports direct WIFI and Bluetooth access

- a brand new **MKR IoT Carrier Board** which has many sensors and actuators built-in. It includes a 240x240 color display, touch sensors, temperature gauge, humidity gauge, pressure sensor, LED lights, a light sensor, accelerometer, gyroscope, buzzer, relays, SD card, and a battery holder. Plus a separate PIR sensor and plant moisture sensor.

Just plug the two together (and sprinkle in Arudino IoT Cloud features) and you have a platform to easily gather data from sensors, send it to the cloud securely, edit/display/graph data via a web dashboard widgets, and send data back from the cloud to the device.

## Getting Started with Explore IoT Kit

Run through the official [Explore IoT Kit lessons](https://explore-iot.arduino.cc/). They walk you through building a number of projects that involve the hardware and the [Arduino Create IoT Cloud](https://create.arduino.cc/iot/).

When you're done, you'll understand how all the pieces work, and will be ready to tackle your own projects.

## Workshop Examples

Arduino and Heroku created projects for the workshop to help people get started:

- The Arduino team wrote an [example Node.js app](https://github.com/fstasi/IoTSK) that shows you how to read and send data to Arduino IoT cloud endpoints.

- The Heroku team created a tutorial for an ["On Air" indicator](https://github.com/heroku-examples/cascadiajs-heroku-arduino-workshop) for your home along with [corresponding Node.js app](https://github.com/heroku-examples/cascadiajs-heroku-arduino-workshop-app).

## Project to Monitor Air Quality and Sunrise/Sunset Times

For my project I wanted to send information from the web to the device and display it there.

_Originally my focus was on sunrise, sunset and moon phase information. Today in the Seattle area (and in most of the US west coast) air quality is very low due to the large number of forest fires in WA, OR and CA so I decided to add Ozone and PM 2.5 pollutant levels using the [AirNow API](https://docs.airnowapi.org)._

<img src="https://assets.stashfive.com/images/arduino-iot-explore-kit-getting-started-air-quality-sunrise-sunset/airnow-seattle.jpg" alt="Pacific Northwest map showing very poor air quality due to forest fires" />

The Arduino IoT Cloud is the glue that connects your web service and the IoT device together. You create properties and dashboards on the web, and you can then send data back and forth between the web and the device.

So the major steps are:

1. Setup properties and create a dashboard of widgets on IoT Cloud.

![Screenshot of the Arduino IoT Cloud Properties for the Air Quality monitor project](https://assets.stashfive.com/images/arduino-iot-explore-kit-getting-started-air-quality-sunrise-sunset/iot-cloud-properties.png)

2. Auto-create an Arduino Sketch (`Edit Sketch` button in above screenshot) and edit it online with [web-based Arduino Editor](https://create.arduino.cc/editor). Here is [my Arduino sketch](https://create.arduino.cc/editor/brianfive/19a5edae-6eb0-4fcb-afaa-bd67ea140613/preview) that displays the data on the Arduino.

3. At this point, you have a working device connected to the cloud, and you can manually update properties in the IoT Cloud Dashboard and see your device update as they change!

![Screenshot of the Arduino IoT Cloud Dashboard for the Air Quality monitor project](https://assets.stashfive.com/images/arduino-iot-explore-kit-getting-started-air-quality-sunrise-sunset/iot-cloud-dashboard.png)

4. Write an application that gathers the data you need and update those same properties programmatically. I wrote a Node.js service hosted on Heroku which calculates sunrise/sunset and also gathers air quality information from the [AirNow API](https://docs.airnowapi.org). I scheduled a recurring task that grabs latest data and pushed it to the IoT Cloud. My code can be found at [github.com/briangershon/sunrise-arduino-iot-cloud](https://github.com/briangershon/sunrise-arduino-iot-cloud).

![Screenshot of running task and sending data to IoT Cloud](https://assets.stashfive.com/images/arduino-iot-explore-kit-getting-started-air-quality-sunrise-sunset/update-properties-from-node.png)

## Helpful information I discovered along the journey

Here are discoveries I made along the way.

### How to Update the Firmware

The device notified me (in a serial port message) that my firmware was out-of-date and recommended to update the firmware to v1.4.1. _Mine was v1.2.3_

Can I update using the online sketch editor? The answer is no from what I can tell. You need to download the actual Arduino IDE.

Also when I downloaded the latest stable version of IDE, it didn't have the newest beta firmware.

Here are the steps to upgrade:

- Download an [hourly build](https://www.arduino.cc/en/Main/Software) of the IDE. It's not recommended you use the non-release IDE for day-to-day development, but the hourly builds have the newest device firmware versions. _Though if you do indeed want latest stable version, just download the stable version of the IDE._

- Follow the [WiFiNINA Firmware Updater](https://www.arduino.cc/en/Tutorial/WiFiNINA-FirmwareUpdater) instructions.

### Color Display Features

I couldn't find much info about the display. The lessons had example code, but didn't mention the resolution, and only demonstrated displaying text. I wanted to draw graphics as well. Playing around, I discovered it's a 240x240 display.

Arduino nicely leverages existing libraries and I discovered the [Adafruit GFX Graphics Library reference](https://learn.adafruit.com/adafruit-gfx-graphics-library) and commands like `drawLine()`, `fillCircle()` and `fillRoundRect()`. e.g. `carrier.display.drawLine(5, 5, 100, 100, ST77XX_WHITE);`

### Updating IoT Cloud Programatically

This was my first experience using Arduino IoT Cloud and it went well.

To programatically update properties from a JavaScript application I discovered [IoT Client JS example project](https://github.com/arduino/iot-client-js/tree/master/example). The README explains how to get your Client ID and Client Secret from Cloud IoT. I created a [pull request](https://github.com/arduino/iot-client-js/pull/42) with a couple of tweaks.

Though later I discovered a higher-level [arduino-iot-js](https://github.com/arduino/arduino-iot-js) library that I'd use next time.

Visit the general [API Docs](https://www.arduino.cc/reference/en/iot/api/) for additional help, as well as to find Python and Golang libraries.

## Thank you

I appreciated the opportunity to play with Heroku, Arduino Explore IoT kit, and Arduino IoT Cloud -- and pulling all of this technology together into a cloud-powered IoT device. I'm inspired by the CascadiaJS, Arduino and Heroku communities and look forward to my next project!

Thank you [Ubi de Feo](https://create.arduino.cc/projecthub/ubidefeo) and [Francesco Stasi](https://github.com/fstasi) from Arduino, and [Julián Duque](https://github.com/julianduque), [Chris Castle](https://github.com/crcastle), and Jennifer Hooper from Heroku.
