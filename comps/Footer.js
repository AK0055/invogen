import Link from 'next/link'

export default function Footer() {
return(
    <footer className="flex border-t-2 p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <Link href='/mainpage'>Invogen</Link>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
    <li>
    <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
    </li>
    <li>
    <a href="#" class="hover:underline">Contact</a>
    </li>
    </ul>
    </footer>
);

}
