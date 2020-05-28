Older Adult Support Services: Standalone Interactive Exercise 
==========


Oral diseases and their sequelae may be effectively managed by regular professional and good daily care for most population groups. Nonetheless, older adults face numerous challenges in receiving both preventive and treatment services. While access to oral health care may be less of a hurdle among institutionalized seniors, cognitive and medical declines, coupled with an oral health care workforce untrained to deal with these complex needs constitute major barriers to receipt of oral care services. Among community dwelling older adults, public payor systems, transportation difficulties, and inability to navigate the healthcare system may complicate both professional and personal oral care. The increasing diversity of US seniors further confounds the picture, as health-related practices are informed by culture and social norms in older adult and their caregivers.

This interactive is a small piece of the larger Older Adults module of [PASS](https://pass.ccnmtl.columbia.edu), a population-based approach to patient services and professional success. PASS was a five-year project to build a website with tools to educate pre-doctoral dental students about patient populations and how demographics play into decision of building a successful dental practice. The PASS content and interactives are being migrated to a sustainable home in the Health Resources and Services Administration [Train](https://www.train.org/) environment.

This and other interactives were developed by the Columbia University [College of Dental Medicine](http://dental.columbia.edu/) in collaboration with the Columbia University [Center ror Teaching & Learning (CTL)](http://ctl.columbia.edu).

REQUIREMENTS
------------
npm
webpack

DEV INSTALLATION
------------
1. Clone the repository
2. Type make runserver. This command will install the necessary npm modules, build the bundle and spin up Webpack's dev server.
3. Navigate to http://localhost:8080.
4. Play around with the interactive!

NPM INSTALLATION
------------
1. npm install supportservices-pack --save
2. ./node_modules/webpack/webpack.js --output-path <output_path> --config ./node_modules/supportservices-pack/webpack.config.js
3. Embed the interactive via an iframe.

```
<code>
	<iframe src="<server>/<output_path>/index.html"></iframe>
</code>
```

#### Configuration
The interactive will alert the user on page navigation if the activity is not yet complete. To turn off this behavior, add a ```quiet=1``` parameter to the url. For example:

```
<code>
    <iframe src="<server>/<output_path>/?quiet=1"></iframe>
</code>
```
