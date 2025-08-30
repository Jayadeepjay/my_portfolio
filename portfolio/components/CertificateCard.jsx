import Image from 'next/image';

export default function CertificateCard({ certificate }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <Image
          src={certificate.image}
          alt={certificate.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{certificate.title}</h3>
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>{certificate.issuer}</span>
          <span>{certificate.date}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{certificate.description}</p>
        <button className="text-purple-600 hover:text-purple-800 dark:hover:text-purple-400 font-medium">
          View Certificate
        </button>
      </div>
    </div>
  );
}
