import Link from 'next/link';
import { useAtom } from 'jotai';


export default function Layout(props) {



    return (
        <>
            <div className="container mt-4">
                <div className="p-4 bg-light rounded shadow">
                    <h2 className="mb-4">GetIT!</h2>
                    <nav className="mb-4">
                        <Link className="ml-3 text-primary" href="/">Home</Link> | 
                         <Link className="ml-3 text-primary" href="/products">Products</Link> |
                         <Link className="ml-3 text-primary" href="/aboutUs">About Us</Link> |
                         <Link className="ml-3 text-primary" href="/contactUs">Contact Us</Link>
                    </nav>
                    <hr className="mb-4" />
                    {props.children}
                </div>
            </div>

        </>
    )
}
