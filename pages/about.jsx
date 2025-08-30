import { personalData } from '../data/personaldata';
import Image from 'next/image';

export default function About() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              {personalData.about}
            </p>
            
            <div className="space-y-4">
              <div className="flex">
                <span className="font-medium mr-2">Location:</span>
                <span>{personalData.address}</span>
              </div>
              <div className="flex">
                <span className="font-medium mr-2">Email:</span>
                <span>{personalData.email}</span>
              </div>
              <div className="flex">
                <span className="font-medium mr-2">Phone:</span>
                <span>{personalData.phone}</span>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              {/* Add your timeline here */}
              <div className="space-y-4">
                <div className="border-l-2 border-purple-500 pl-4 py-2">
                  <h4 className="font-medium">Current Position</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2022 - Present</p>
                </div>
                {/* Add more timeline items */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}