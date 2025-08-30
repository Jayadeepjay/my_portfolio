import { skillsData } from '../data/skillsdata';

export default function Skills() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">My Skills</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-medium mb-4">Programming Languages</h4>
                {skillsData.languages.map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-purple-600 h-2.5 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Repeat for other technical skill categories */}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">Soft Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skillsData.softSkills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}