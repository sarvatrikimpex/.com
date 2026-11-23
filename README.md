# Sarvatrik Impex Website

A fast, static website (no build step) for Sarvatrik Impex, Pune, India.

## Files
- `index.html`: landing page (hero, products, About Us, why us, call to action)
- `inquiry.html`: inquiry and contact page
- `style.css`: all styling. Colours are at the top of the file.
- `main.js`: menu, scroll animations, inquiry form
- `images/`: placeholder pictures

## Put it online with GitHub Pages
1. Create a new repository on GitHub (for example `sarvatrik-impex`).
2. Upload all of these files, keeping the `images` folder.
3. Open the repository's **Settings > Pages**.
4. Under "Build and deployment", choose **Deploy from a branch**, pick `main` and `/ (root)`, then Save.
5. After a minute or two the site is live at `https://<your-username>.github.io/sarvatrik-impex/`.

## Replacing the placeholder pictures
Save your real photo into `images/` with the **same file name** as the placeholder (for example `onion-powder.svg`). If your photo is a JPG, upload `onion-powder.jpg` and change the `src` in `index.html` to match. Use photos around 1200 px wide and compressed, so the site stays fast.

Placeholders to replace: `hero`, `about`, `onion-powder`, `drumstick-powder`, `other-powders`, `fresh-produce`, `grains-pulses`, `spices`.

## Changing text or products
Everything is plain text in `index.html`. To add a product, copy one `<a class="card ...">` block and edit the name, text and image. To add it to the form's dropdown, add an `<option>` in `inquiry.html`.

## Inquiry form (important first-time step)
The form sends inquiries to sarvatrik.impex@gmail.com through the free FormSubmit service. The very first time anyone submits the form, FormSubmit sends an **activation email** to that address. Open it and click the confirm link once. After that, every inquiry arrives in your inbox. Send one test inquiry yourself after going live, and check the spam folder if you do not see the activation email.

## Security note
Never put your email password in these files or in GitHub. A public GitHub repository is visible to everyone.
