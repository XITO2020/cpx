import axios from 'axios';
import {useState, useCallback} from 'react';
import  Input  from "@/components/Input";
import { signIn } from 'next-auth/react'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { FaGithub } from 'react-icons/fa';
import MetroMap from '@/components/Subway';



const Auth = () =>{
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('register')
    const router = useRouter();
    
    const toggleVariant = useCallback(() =>{
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, []);

    
    const login = useCallback(async () => {
    try {
        // Vérification des identifiants de l'utilisateur
        const isAdmin = email === 'admin@naim.com' && password === '7654321';
        
        if (isAdmin) {
            // Si l'utilisateur est un admin, redirigez-le vers la page de tableau de bord admin
            router.push('/admin/dashboard');
            
        } else {
            // Si l'utilisateur n'est pas un admin, redirigez-le vers la page de profil
            await signIn('credentials', {
                email,
                password,
                callbackUrl: '/',
                redirect: false
            });
            router.push('/profiles');
        }
    } catch (error) {
        console.log(error);
    }
}, [email, password, router]);


    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            });
            login();
        } catch( error) {
            console.log("l'erreur elle est la: " +error)
        }
    }, [email, name, password, login]);

    return (
        <div className="relative">
             <div className="absolute top-10 left-10 z-10">
                    <Link href="/">
                        <img
                        className="h-8 lg:h-12 opacity-40 rounded-md hover:opacity-90"
                        src="/img/conspix/cpl.png"
                        alt="conspixlogo"
                        
                        />
                    </Link>
                </div>
            <div className="relative h-[95vh] 
             text-white bg-no-repeat bg-cover bg-fixed border-b-zinc-900 border-b-4 ">
                <div className=" backto absolute top-0 left-0 right-0 bottom-0 bg-hero-pattern bg-opacity-50 hover:bg-opacity-90 bg-cover z-4"></div>
                <div className="bg-black w-full h-full lg:bg-opacity-50">
                    <nav className="px-12 py-5 z-8">
                        <img src="/img/conspix/cpl3.png" 
                        className="h-12 rounded-l-xl"
                        alt="logo de conspix" />
                    </nav>
                    <div className="flex justify-center z-8">
                        <div className="cadre bg-black z-100 relative bg-opacity-70 px-16 py-16 self-center mt-2 lg-:w-2/5 lg:max-w-md rounded-md w-full">

                            <h2 className="text-white text-4xl mb-8 font-semibold"> 
                            {variant === 'register' ? 'Register' : 'Login'}
                            </h2>
                            <div className="flex flex-col gap-4">
                               
                                <Input 
                                label="Email"
                                onChange={(ev: any) =>{setEmail(ev.target.value)}}
                                id="email"
                                type="email"
                                value={email}
                                />
                                <Input 
                                label="password"
                                onChange={(ev: any) =>{setPassword(ev.target.value)}}
                                id="password"
                                type="password"
                                value={password}
                                />
                                 {variant === 'register' && (
                                    <Input 
                                    label="Username"
                                    onChange={(ev: any) =>{setName(ev.target.value)}}
                                    id="name"
                                    type="name"
                                    value={name}
                                    />
                                )}
                            </div>
                            <button onClick={variant === 'login' ? login : register} 
                            className={` text-stone-200 font-semibold
                                rounded-md w-full mt-10 transition px-4 hover:text-white
                                ${variant === 'register' ? 'hover:bg-yellow-400 hover:text-zinc-600  bg-rose-500' : 'hover:bg-rose-700 bg-violet-600' 
                                }
                                `}>
                                {variant === 'login' ? 'Log in!' : 'Sign up!'}
                            </button>

                            
                            <div className="w-full flex justify-center">
                                <div onClick={() => signIn('github', { callbackUrl: '/profiles'})} 
                                className="w-10
                                 h-10 bg-zinc-950 rounded-full mt-4
                                 flex items-center justify-center 
                                 cursor-pointer hover:opacity-80 transition">
                                    <FaGithub size={30} />
                                </div>
                            </div>
                                
                            <p className="text-neutral-500 mt-12">
                                {variant === 'login' ? 'First time using Conspix ?'
                                : 'Already have an account ?'} 
                            <span className="text-white ml-1 hover:underline cursor-pointer"
                            onClick={toggleVariant}
                            >
                            {variant === 'login' ? ' Create an account'
                            : ' 👑  Sign in!'
                            }
                            </span>
                            </p>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
    )
}

export default Auth;