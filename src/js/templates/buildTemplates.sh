cd templates;
rm *.js;
FILES=*.hbs;
for f in $FILES;
do
	echo "compiling a template - $f";
	handlebars $f -f $f.js;
done
cat *.js > seecret_templates.js;
rm *.hbs.js;
cd ..
java -jar compiler.jar --js templates/seecret_templates.js --js_output_file seecret_templates-1.0.min.js;
java -jar compiler.jar --js seecret_templates.js --js_output_file seecret_app-1.0.min.js;
java -jar compiler.jar --js seecret_compressoin.js --js_output_file seecret_compression-1.0.min.js;