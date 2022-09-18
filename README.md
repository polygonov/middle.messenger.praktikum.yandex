# [Yandex.Practicum Messenger]

This progect is Polyakov Igor first sprint task for Yandex.Practicum.

## Description

It's just a Html+CSS template of messanger. It's based on next technologies:
* Handlebars as templating
* PostCSS Nested is for usefull BAM style
* PostCSS import is for import CSS 

## Visual prototype

Visual prototype was made in Figma, it's based on Yandex.Practicum template for first sprint, but has dark theme and some new frames and icons.
You can watch my Figma template on kink below:
https://www.figma.com/file/TgBoZcxSUZvEnEMZmTmtlm/Chat_external_link_Igor_Polyakov?node-id=0%3A1

## How to use

"npm run dev" - is command to start development server based on Parcel
"npm run build" - is command to buid dist folder, Nentlify uses it for buld
"npm run start" - is command to buid dist folder and start local Express server on port 3000

## How to navigate

Project has 7 next pages:
* index.html - it's main page with dialogs previews, navigate to "index-selected" and "profile"
* index-selected.html - it's same as "index", but has messages block and selected dialog, navigate to "profile"
* login.html - it's page to login, navigate you to "index" or "login-reg"
* login-reg.html - it's page to registration, navigate you to "index" or "login" 
* profile.html - it's page to see profile data, navigate to "index", "profile-changer", "profile-password"
* profile-changer.html - it's page to change profile data, navigate to "index"
* profile-password.html - it's page to change password, navigate to "index"

Enterence point is index.hbs page. If you click on dialogs, you will see messages block. Profile label link to profile settings.
Auth block is out of main app. If you want to see auth pages, you shoud type their path on browser search line "login.html" or "login-reg.html"

## Take a look

This project deployed on Netlify, take a look!

https://delicate-profiterole-548651.netlify.app/

