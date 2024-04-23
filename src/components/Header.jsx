import { Footer } from "./Footer"

export const Header = () => {
    return (
        <>
            
            <div className="flex justify-center align-middle p-3">
                <div className="flex justify-stretch gap-10">
                    <div className="flex self-items-start">
                        <img className="max-w-28 max-h-28 rounded-full max" src="/logo.jpeg"></img>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="text text-4xl font-mono rounded-l-full text-pink-500 border-2 border-pink-500 px-2 shadow-lg">
                            Certify
                        </div>
                        <div className="border-2 border-orange-500 rounded-r-full font-extrabold text-orange-500 p-2 shadow-lg">
                            Me
                        </div>
                    </div>  
                    <div className="flex items-end">
                        {/*<Footer />  */}  
                    </div>
                </div>
                       
            </div>
        
        </>
    )
}