cd ../src/js/templates;
rm *.js;
FILES=*.hbs;
for f in $FILES;
do
	echo "compiling a template - $f";
	handlebars $f -f $f.js;
done
echo "creating seecret_templates.js";
cat *.js > seecret_templates.js;
echo "removing all *.hbs.js files";
rm *.hbs.js;
cd ..
echo "minimizing templates/seecret_templates.js";
java -jar ../../build/compiler.jar --js templates/seecret_templates.js --js_output_file seecret_templates-1.0.min.js;
echo "minimizing seecret_app.js";
java -jar ../../build/compiler.jar --js seecret_app.js --js_output_file seecret_app-1.0.min.js;
echo "minimizing seecret_compression.js";
java -jar ../../build/compiler.jar --js seecret_compression.js --js_output_file seecret_compression-1.0.min.js;

cd ..;
rm hashes.txt;

echo "SHA1 index.html";
openssl sha1 index.html  >> hashes.txt;

echo "SHA1 js/seecret-1.0.min.js";
openssl sha1 js/seecret-1.0.min.js >> hashes.txt;

echo "SHA1 js/seecret_app-1.0.min.js";
openssl sha1 js/seecret_app-1.0.min.js >> hashes.txt;

echo "SHA1 js/seecret_compression-1.0.min.js";
openssl sha1 js/seecret_compression-1.0.min.js >> hashes.txt;

echo "SHA1 js/seecret_templates-1.0.min.js";
openssl sha1 js/seecret_templates-1.0.min.js >> hashes.txt;

echo "SHA1 js/covertexts.js";
openssl sha1 js/covertexts.js >> hashes.txt;

echo "SHA1 lib/shoco/shoco_jquery_safe.js";
openssl sha1 lib/shoco/shoco_jquery_safe.js >> hashes.txt;

echo "SHA1 lib/smaz/smaz.js";
openssl sha1 lib/smaz/smaz.js >> hashes.txt;

echo "SHA1 lib/moment-twitter.js";
openssl sha1 lib/moment-twitter.js >> hashes.txt;

echo "SHA1 css/seecret_app.css";
openssl sha1 css/seecret_app.css >> hashes.txt;

echo "SHA1 css/font-awesome-4.3.0/css/font-awesome.min.css";
openssl sha1 css/font-awesome-4.3.0/css/font-awesome.min.css >> hashes.txt;




