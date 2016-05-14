
rm *.js;
FILES=*.hbs;
for f in $FILES;
do
	echo "compiling a template - $f";
	handlebars $f -f $f.js;
done
cat *.js > seecret_templates.js;
rm *.hbs.js;