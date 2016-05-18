cd templates;
rm *.js;
FILES=*.hbs;
for f in $FILES;
do
	echo "compiling a template - $f";
	handlebars $f -f $f.js;
done
echo "creating seecret_templates.js";
cat *.js > seecret_templates.js;
rm *.hbs.js;
cd ..
echo "minimizing templates/seecret_templates.js";
java -jar compiler.jar --js templates/seecret_templates.js --js_output_file seecret_templates-1.0.min.js;
echo "minimizing seecret_app.js";
java -jar compiler.jar --js seecret_app.js --js_output_file seecret_app-1.0.min.js;
echo "minimizing seecret_compression.js";
java -jar compiler.jar --js seecret_compression.js --js_output_file seecret_compression-1.0.min.js;