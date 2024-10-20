import React from 'react'
import { SectionWrapper } from "../hoc";

const Map = () => {
  return (
    <div class="contact-x text-gray-600 body-font relative" id="contact">
    <div class="absolute inset-0 bg-gray-300">
        <iframe
            width="100%"
            height="100%"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            title="map"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=PDA%20Library&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
            
        ></iframe>
    </div>
    <div class="container px-5 py-24 mx-auto flex">
        <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h1 class="text-gray-900 text-3xl mb-1 font-medium title-font">Contact Us</h1>
            <p class="leading-relaxed mb-5 text-gray-600">Wanna reach out to us??</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd"/>
            </svg>
            <p class="leading-relaxed mb-5 text-gray-600">MIT Rd, Radha Nagar, Chromepet, Chennai, Tamil Nadu 600044</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            <p class="leading-relaxed mb-5 text-gray-600">pda@mitindia.edu</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
            </svg>
            <p class="leading-relaxed mb-5 text-gray-600">@pda_mit (Instagram)</p>
            <hr/>
            <br/>
            <button type="button" onclick="location.href='mailto:pda@mitindia.edu'" className="h-[40px] px-10 py-2 text-xl font-semibold text-center text-white transition duration-300 rounded-lg hover:from-amber-600 hover:to-rose-600 ease bg-gradient-to-br from-amber-500 to-rose-500">
    Email Us!    
</button>
            <br/>
            <button type="button" data-modal-toggle="default-modal" className="h-[40px] px-10 py-2 text-xl font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500">
SignUp Newsletter
</button>
        </div>
      
        <div id="default-modal" aria-hidden="true" class="hidden overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
            <div class="contact-x relative w-full max-w-4xl px-4 h-full md:h-auto">
                
                <div class="bg-white rounded-lg shadow relative">
                    
                    <div class="flex items-start justify-between p-5 border-b rounded-t">
                        <h3 class="text-xl lg:text-4xl font-semibold">
                            Newsletter signup
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="default-modal">
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                   
                    <div class="p-6 space-y-6">
                        <div class="flex bg-red-100 rounded-lg p-4 mb-4 text-xl text-red-700" role="alert">
                            <svg
                                class="w-5 h-5 inline mr-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                            </svg>
                            <div>
                                <span class="font-medium">WARNING!</span>
                                This feature is in progress and not complete, so stay tuned for the feature update! Contact PDA Team for more info 😉
                            </div>
                        </div>
                        <p class="text-gray-500 text-xl leading-relaxed">
                            By submitting your mail ID in below form, you are agreeing to signup our newsletter. Don't worry we won't spam you a lot :) Our content would be sent only periodic wise. You can sign-out our newsletter at any time! ;)
                        </p>
                        <form><div>
                            <label for="email" class="text-xl font-medium text-gray-900 block mb-2">Your email</label>
                            <input
                                type="email"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="name@flowbite.com"
                                required
                            />
                        </div>
                        
                        <div class="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b">
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center">I accept</button></div>
                        </form>
                        <button data-modal-toggle="default-modal" type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center">Decline</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}


export default SectionWrapper(Map, "map");