import axios from 'axios';
import {useState, useCallback} from 'react';
import  Input  from "@/components/Input";
import { signIn } from 'next-auth/react'; 
import {useRouter} from 'next/router';

import { FaGithub } from 'react-icons/Fa';
import MetroMap from '@/components/Subway';


const Auth = () =>{
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login')

    

    const toggleVariant = useCallback(() =>{
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, []);

    const router = useRouter();
    const login = useCallback( async() =>{
        
        try {
            await signIn('credentials', {
                email,
                password,
                callbackUrl : '/profiles'
            })
            router.push('/')
        }   
        catch(error) {
            console.log(error)
        }
    }, [router, email, password]);

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                name,
                email,
                password
            });
            login();
        } catch( error) {
            console.log("putain l erreur elle est la: " +error)
        }
    }, [name, email, password, login]);




    return (
        <>
            <div className="relative bg-hero-pattern h-[85vh] screen
             text-white bg-no-repeat bg-center bg-fixed border-b-zinc-900 border-b-4">
                <div className="bg-black w-full h-full lg:bg-opacity-50">
                    <nav className="px-12 py-5">
                        <img src="/img/conspix/cpl3.png" 
                        className="h-12 rounded-l-xl"
                        alt="logo de conspix" />
                    </nav>
                    <div className="flex justify-center">
                        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg-:w-2/5 lg:max-w-md rounded-md w-full">
                            <h2 className="text-white text-4xl mb-8 font-semibold"> 
                            {variant === 'login' ? 'Sign In' : 'Register'}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {variant === 'register' && (
                                    <Input 
                                    label="Username"
                                    onChange={(ev: any) =>{setName(ev.target.value)}}
                                    id="name"
                                    type="name"
                                    value={name}
                                    />
                                )}
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
                            </div>
                            <button onClick={variant === 'login' ? login : register} 
                            className={` text-stone-200 font-semibold
                                rounded-md w-full mt-10 transition px-4 hover:text-white
                                ${variant === 'login' ? 'hover:bg-fuchsia-700 bg-violet-600' : 
                                'hover:bg-yellow-400 hover:text-emerald-700 bg-pink-600'}
                                `}>
                                {variant === 'login' ? 'Log in!' : 'Sign up!'}
                            </button>

                            
                            <div className="w-full flex justify-center">
                                <div onClick={() => signIn('github', { callbackUrl: '/profiles'})} 
                                className="w-10
                                 h-10 bg-emerald-800 rounded-full mt-4
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

        </>
    )
}

export default Auth;