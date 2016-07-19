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
  
  All third party dependencies are served via public CDNs like [cdnjs](https://cdnjs.com/) or [RawGit](http://rawgit.com/). In addition we provide [Subresource Integrity](https://www.w3.org/TR/SRI/) hashes on all our script and link tags calculated with a public [SRI Hash generator](https://www.srihash.org/). Subresource Integrity is an important security feature and we encourage you to [read up on it](http://lmgtfy.com/?q=Subresource+Integrity) and [test your browser](http://w3c-test.org/subresource-integrity/subresource-integrity.sub.html) for support.
  
## Building
There is no build.  Just copy the contents of the [src/main/resources/public](src/main/resources/public) to your web server as is.  To read more about hosting Seecret yourself, go to [https://www.seecret.net/mirror.html](https://www.seecret.net/mirror.html)

## Deployment 
The app authenticates the user to Twitter via Oauth.io.  Contact us to add your url to our Oauth.io account.   You can run on localhost as well.

There is also a [Spring Boot](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-running-your-application) deployment wrapper you can use to run the application locally. Just run `./gradlew bootRun` and load [http://localhost](http://localhost)

## Contributing
We have a [roadmap](https://github.com/simpledynamics/seecret_app/wiki) of features and channel integrations.  Feel free to fork this repo and send us a pull request.

## Contacting us
 - [Nate Grover](https://github.com/nategrover)
 
## Contributors 
 - [Nate Grover](https://github.com/nategrover)
 - [Barrett Tucker](https://github.com/barretttucker)
 - [Scott McFarlane](https://github.com/keola4)

## Hashes
The SHA384 hash for version 1.0 of the Seecret index.html file is 
 - SHA384(index.html)= base64: ZJLQXO4Bj+jiNPczgxe0V6hzlZz8qNqdyCtH3P/+2XDK89NpdDMxsbridYxl2CF+

This hash is also published at the following locations:
- [https://www.seecret.net/mirror.html](http://www.seecret.net/mirror.html)
- [https://www.twitter.com/seecretapp](https://www.twitter.com/seecretapp)
- [https://www.facebook.com/Seecret-1780007618900168/info?tab=page_info](https://www.facebook.com/Seecret-1780007618900168/)
- [https://www.simpledynamics.net/seecret_hashes.html](https://www.simpledynamics.net/seecret_hashes.html)
-  More to‍‍‌‌​​​‌‍‌‌​‌​​​‍‌‌‌​‌​​‍‌‌‌​‌​​‍‌‌‌​​​​‍‌‌‌​​‌‌‍‌‌‌​‌​‍‌​‌‌‌‌‍‌​‌‌‌‌‍‌‌​​‌‌‌‍‌‌​‌​​‌‍‌‌‌​​‌‌‍‌‌‌​‌​​‍‌​‌‌‌​‍‌‌​​‌‌‌‍‌‌​‌​​‌‍‌‌‌​‌​​‍‌‌​‌​​​‍‌‌‌​‌​‌‍‌‌​​​‌​‍‌​‌‌‌​‍‌‌​​​‌‌‍‌‌​‌‌‌‌‍‌‌​‌‌​‌‍‌​‌‌‌‌‍‌‌​‌‌‌​‍‌‌​​​​‌‍‌‌‌​‌​​‍‌‌​​‌​‌‍‌‌​​‌‌‌‍‌‌‌​​‌​‍‌‌​‌‌‌‌‍‌‌‌​‌‌​‍‌‌​​‌​‌‍‌‌‌​​‌​‍‌​‌‌‌‌‍‌‌​​​‌‍‌‌​‌‌​‍‌‌​​​‌​‍‌‌‌​​​‍‌‌​‌​​‍‌‌​‌‌​‍‌‌​‌‌‌‍‌‌​​​​‍‌‌​​‌​‌‍‌‌​​‌‌​‍‌‌​​​‌‍‌‌​​‌‌​‍‌‌​‌​​‍‌‌​​‌‌‍‌‌​​‌‌​‍‌‌‌​​​‍‌‌​​‌‌​‍‌‌​‌​‌‍‌‌​​‌​​‍‌‌​​​‌​‍‌‌​​​‌‌‍‌‌​​‌​‍‌‌​​​‌‍‌‌‌​​‌‍‌‌​​​‌​‍‌‌​​‌‌‍‌‌​‌‌‌‍‌‌​​‌‌‍‌‌​‌‌​‍‌‌​‌‌‌‍‌‌‌​​​‍‌‌​‌‌‌‍‍‍ come...



## License 
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)
