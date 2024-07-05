---
title: Pentest Tools - ⡷𝚔𝚊𝚛𝚖𝚊 𝚟𝟸⢾
description: Pentest Tools - ⡷𝚔𝚊𝚛𝚖𝚊 𝚟𝟸⢾
excerpt:
  Karma V2 allowing us to uncover detailed information about targets, such as vulnerable IPs, internal and external infrastructure, and exposed public leaks.
datetime: 2024-06-16T19:33:07.000+00:00
tags:
  - Tools
  - OSINT
  - Shodan
featured: true
category: Tutorial
author: nGbonzini
type: article
coverImage:  https://miro.medium.com/v2/resize:fit:640/format:webp/1*ED6ZmPCqS1-UclNjSIYHbg.png
coverImageAlt: Karma V2
coverImageWidth: "2725"
coverImageHeight: "1400"
ogImage: "/assets/blog/hello-world/cover.jpg"
ogImageAlt: something
language: "English"
---
----

## What is Karma V2?
In 2023, I discovered this fabulous tool called Karma V2 created by [Dheerajmadhukar](https://x.com/Dheerajmadhukar) while watching [this video](https://www.youtube.com/watch?v=-jLbRnmGYaA). Karma V2 is an automated Open Source Intelligence (OSINT) framework. 


This tool utilizes Shodan’s premium API to deliver powerful results, allowing us to uncover detailed information about targets, such as vulnerable IPs, internal and external infrastructure, and exposed public leaks.
 

Karma V2 offers various modes to suit different reconnaissance needs:

- **In-Scope and Out-of-Scope IP Scanning**: Validates IPs through CN matches and detects out-of-scope IPs.
- **ASN and BGP Analysis**: Conducts detailed searches of autonomous system numbers, BGP statistics, neighbors, and IPv4 and IPv6 prefixes.
- **Host Scanning**: Identifies operating systems, servers, products, CVEs, open ports, and organizations.
- **Specific Vulnerability Detection**: Scans domains to identify vulnerabilities and exploits based on CVE IDs.
- **Favicon Search and Analysis**: Detects technologies using generated favicon hashes and custom templates.
- **Ignore CDN Nodes**: Excludes CDN nodes such as Akamai and Cloudflare during scans.
- **Leak and DevOps Asset Search**: Finds interesting leaks and assets related to DevOps, SIEM, and open dashboards.

## Installation
One problem that I and other colleagues encountered is the installation of the tool, as it depends on other software. This is the main reason for this post: to provide a straightforward, step-by-step installation guide. If, in the end, you follow this guide and it doesn’t work on the first try, feel free to contact me.

1 — Clone repo

```
git clone https://github.com/Dheerajmadhukar/karma_v2.git
cd karma_v2
```

2 — Install shodan & mmh3 python module

```
sudo python3 -m pip install shodan mmh3
```

3 — Install JSON Parser [JQ]

```
sudo apt install jq -y
```  

4 — Install httprobe

```
git clone https://github.com/tomnomnom/httprobe.git
cd httprobe
go build main.go
mv main httprobe
sudo mv httprobe /bin/
```

5 — Install Interlace
```
git clone https://github.com/codingo/Interlace.git
pip install -r requirements.txt
sudo python3 setup.py install
```

6 — Install Nuclei
```
sudo apt install nuclei
```

7 — Install lolcat

```
sudo apt install lolcat -y
```

8 — Install anew
```
git clone https://github.com/tomnomnom/anew.git
cd anew
go build main.go
mv main anew
sudo mv anew /bin/
```

9 — Put your apikey
```
cat > .token
SHODAN_PREMIUM_API_HERE
```

10 — Use
```
bash karma_v2 -d DOMAIN --limit -1 -deep
```

## Pictures
![Image 1](https://miro.medium.com/v2/resize:fit:786/format:webp/1*yQhGA0pBrmsfizxYj2UOSg.png)
![Image 2](https://miro.medium.com/v2/resize:fit:786/format:webp/1*TsF03j2E8kSL3D3WIcmfSQ.png)

## For more information
- [Github Repo](https://github.com/Dheerajmadhukar/karma_v2)  
- [Video](https://www.youtube.com/watch?v=ZMSX0vCsLOY&t=1s)