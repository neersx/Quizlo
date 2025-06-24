# SSL Certificate Installation for Nginx

This guide walks you through converting certificate files and installing your SSL certificate chain in Nginx on Ubuntu.

## Prerequisites

* Certificate files in `/home/neers/ssl/quizloai/`:

  * `quizloai_com.crt`
  * `quizloai_com.ca-bundle`
* Private key:

  * `quizloai.com.key`
* Nginx installed and configured on your server
* Access to the terminal with sudo privileges

## Steps

### 1. Convert to UNIX line endings

Windows‑style CRLF (`\r\n`) can break Nginx. Ensure all files use LF only:

```bash
sudo apt install -y dos2unix          # install dos2unix if needed
cd /home/neers/ssl/quizloai/

dos2unix quizloai_com.crt
dos2unix quizloai_com.ca-bundle
```

### 2. Rebuild the fullchain in one go

Concatenate your server cert and intermediate bundle into a single chain file. The command below inserts exactly one blank line between certificates:

```bash
cd /home/neers/ssl/quizloai/

( cat quizloai_com.crt; echo; cat quizloai_com.ca-bundle ) \
  > quizloai_com-fullchain.crt
```

### 3. Quick sanity‑check with OpenSSL

Verify the combined chain parses cleanly:

```bash
openssl x509 -in quizloai_com-fullchain.crt -noout -text
```

You should see the certificate details and **no** errors about bad end lines.

### 4. Update permissions and reload Nginx

Ensure Nginx can read the chain file, test your config, and reload:

```bash
sudo chmod 644 /home/neers/ssl/quizloai/quizloai_com-fullchain.crt
sudo nginx -t
sudo systemctl reload nginx
```

If `nginx -t` reports **`syntax is ok`** and **`test is successful`**, your HTTPS setup is complete!

---

*Last updated: June 24, 2025*
