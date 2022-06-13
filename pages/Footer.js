import Link from 'next/link'

export default function Footer() {
return(
    <footer className="sticky top-[500vh] p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <Link href='/mainpage'>Invogen</Link>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
    <li>
    <Link href='/mainpage'>Your invoices</Link>
    </li>
    </ul>
    </footer>
);

}
