export default function Knowledge() {
    const knowledgePosts = [
      {
        title: "Understanding React Hooks",
        summary: "Deep dive into how React hooks work under the hood",
        date: "May 2023",
        tags: ["React", "JavaScript"]
      },
      // Add more knowledge posts
    ];
  
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">My Knowledge</h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            {knowledgePosts.map((post, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.summary}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }