# The Seecret App
## Version
1.0 

## What is Seecret?
The repository is the contents of the Seecret app as described at [https://www.seecret.net](https://www.seecret.net)

## Dependencies
  - The Seecret core engine for the plaintext steganography.  Fork or contribute at [https://github.com/simpledynamics/seecret](https://github.com/simpledynamics/seecret)
  - Openpgp.js for the PGP operations.  Fork or contribute at [https://github.com/openpgpjs/openpgpjs](https://github.com/openpgpjs/openpgpjs)
  - Jquery for duh
  - Smaz.js  for compression - Fork or contribute at [https://github.com/antirez/smaz](https://github.com/antirez/smaz)
  - Shoco.js - we modified it to play nice with jquery and the file is shoco_jquery_safe.js . Fork or contribute at [https://github.com/Ed-von-Schleck/shoco](https://github.com/Ed-von-Schleck/shoco)
  - Handlebars.js for html templating - Fork or contribute at [https://github.com/wycats/handlebars.js/](https://github.com/wycats/handlebars.js/)
  - Moment.js for date formatting - Fork or contribute at [https://github.com/moment/moment/](https://github.com/moment/moment/)
  - moment-twitter.js - A Twitter-like date formatter for moment.js - Fork or contribute at [https://github.com/hijonathan/moment.twitter](https://github.com/hijonathan/moment.twitter)
  - Fastclick.js for mobile click responsiveness - Fork or contribute at [https://github.com/ftlabs/fastclick](https://github.com/ftlabs/fastclick)
  
## Building
There is no build.  Just copy the contents of the src folder and serve as is.  

## Deployment 
The app authenticates the user to Twitter via Oauth.io.  Contact us to add your url to our Oauth.io account, or set up your own and put your key value in 
js/oauthio_key.js.  You can run on localhost as well.

## Contributing
We have a [roadmap](https://github.com/simpledynamics/seecret_app/wiki) of features and channel integrations.  Feel free to fork this repo and send us a pull request.

## Contacting us
 - [Nate Grover](https://github.com/nategrover)
 - [Barrett Tucker](https://github.com/barretttucker)

## Hashes
The SHA1 hashes for version 1.0 of the Seecret app are:

- index.html:  SHA1 Hash : 09026f3a2a581f86d9723482a692fbce866ca3a4
- js/seecret_app-1.0.min.js  SHA1 Hash : 2008c8d3d0101508d5cd4c406d285da4d90f3b23
- js/seecret-1.0.min.js  SHA1 Hash : 42ba4410828ff6b75a5f2ea91cc085bea6807777
- js/seecret_compression-1.0.min.js SHA1 Hash : f0e62aaabf156dec6e28fe9b74bf4aa17ac94e79
- js/covertexts SHA1 Hash : 0646b3106348e0727a0178c3c346f623eeef7955
- js/seecret_templates-1.0.min.js SHA1 Hash : 7d4ef463c1e708dd7c5f26627d50c48d6fbde159
- lib/shoco/shoco_jquery_safe.js SHA1 Hash : c2875c8a32e98efaa6a52cb388be7f62ddcd7239
- lib/smaz/smaz.js SHA1 Hash : 4b863eeb83ec5018c24488137855fda2af3698ad
- lib/moment-twitter.js SHA1 Hash : 9a3e30a078de9fb7b37300f1c6a22a023d6af7cd
- css/seecret_app.css  SHA1 Hash : 6347c14a6dcd7ad4e40182a410c28ada9308b966 
- css/font-awesome-4.3.0/css/font-awesome.min.css SHA1 hash 3e435d5167460aaf367836e1973e90a47039faea
- js/seecret_hashes.js SHA1 Hash : 44af2c26b8d55e05f30338040f6f620580e2cd2d

The hashes are also published at the following locations (sometimes as hidden Seecrets):
- [https://www.seecret.net/mirror.html](http://www.seecret.net/mirror.html)
- [https://www.twitter.com/seecretapp](https://www.twitter.com/seecretapp)
- [https://www.facebook.com/Seecret-1780007618900168/info?tab=page_info](https://www.facebook.com/Seecret-1780007618900168/)
- [https://www.linkedin.com/company/simple-dynamics](https://www.linkedin.com/company/simple-dynamics)
- [https://www.simpledynamics.net/seecret_hashes.html](https://www.simpledynamics.net/seecret_hashes.html)
- [https://gist.github.com/nategrover/16b84670ef1f43f8f5dbc219b3736787](https://gist.github.com/nategrover/16b84670ef1f43f8f5dbc219b3736787)


more to come...

## License 
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)
