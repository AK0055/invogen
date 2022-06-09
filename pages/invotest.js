import easyinvoice from "easyinvoice";
import {targetcli} from "./main2page";
import {targetsen} from "./mainpage";
import {tarprodcopy} from "./products";
import {targetinv} from "./invodetails";
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function invotest(){
    console.log(targetcli)
   console.log(targetsen)
   console.log(tarprodcopy)
   console.log(targetinv)

   var data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    "customize": {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
    },
    "images": {
        // The logo on top of your invoice
        "logo": customlogo,
        // The invoice background
        "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
    },
    // Your own data
    "sender": {
        "company": targetsen.company,
        "address": targetsen.street,
        "zip": targetsen.zip,
        "city": targetsen.city,
        "country": targetsen.country

    },
    // Your recipient
    "client": {
        "company": targetcli.company,
        "address": targetcli.street,
        "zip": targetcli.zip,
        "city": targetcli.city,
        "country": targetcli.country
    },
    "information": {
        // Invoice number
        "number": targetinv.invonum,
        // Invoice date
        "date": targetinv.invodate,
        // Invoice due date
        "due-date": targetinv.due
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    "products": tarprodcopy,
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "Kindly pay your invoice within 15 days.",
    // Settings to customize your invoice
    "settings": {
        "currency": targetinv.curr, // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
         "tax-notation": targetinv.tax.toLowerCase, // Defaults to 'vat'
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    "translate": {
        // "invoice": "FACTUUR",  // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
        // "products": "Producten", // Defaults to 'Products'
        // "quantity": "Aantal", // Default to 'Quantity'
        // "price": "Prijs", // Defaults to 'Price'
        // "product-total": "Totaal", // Defaults to 'Total'
        // "total": "Totaal" // Defaults to 'Total'
    },
};

//Create your invoice! Easy!
 easyinvoice.createInvoice(data, function (result) {
    //The response will contain a base64 encoded PDF file
    console.log('downloading');
    easyinvoice.download('myInvoice.pdf', result.pdf);
});
//const result = await easyinvoice.createInvoice(data);
return(
   <div><h1>Invoice page</h1>
   <Link href='/mainpage'>
       <a>goto main</a>
   </Link>
   
   </div>

);
}