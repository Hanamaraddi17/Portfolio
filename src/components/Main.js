import React, { useState } from 'react';
import { Sun, Moon, Github, Linkedin, Mail, X } from 'lucide-react';

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50">
    <style>{`.logo { font: bold 80px sans-serif; }`}</style>
    <text x="50" y="75" textAnchor="middle" className="logo" fill="currentColor">
      <tspan>H</tspan>
      <tspan dx="-15">B</tspan>
    </text>
  </svg>
);

const projects = [
  { id: 1, title: 'Calculator', description: 'Basic calculator', image: '/images/calculator.png', sourceCode: 'https://github.com/Hanamaraddi17/Calculator', demo: 'https://calculator-reddy.vercel.app/' },
  { id: 2, title: 'Register Page', description: 'A Registration page', image: '/images/Register.png', sourceCode: 'https://github.com/Hanamaraddi17/RegistrationForm', demo: 'https://registration-form-reddy.vercel.app/' },

  { id: 3, title: 'to-do-List', description: 'A to do list site ', image: '/images/todo.png', sourceCode: 'https://github.com/Hanamaraddi17/To-Do-List', demo: 'https://to-do-list-reddy.vercel.app/' },

  { id: 4, title: 'Watch World', description: 'An e-commerce platform front end for luxury watches', image: '/images/watchWorld.png', sourceCode: 'https://github.com/Hanamaraddi17/WatchWorld', demo: 'https://watch-world-reddy.vercel.app/' },

  { id: 5, title: 'BookBus', description: 'A simple platform to book bus online ', image: '/images/BookBus.png', sourceCode: 'https://github.com/Hanamaraddi17/BusBooking', demo: 'https://busbooking-psi.vercel.app/' },



  { id: 6, title: 'Artify', description: 'Discover, Collect, and Celebrate Art', image: '/images/artify.png', sourceCode: 'https://github.com/Hanamaraddi17/Artify', demo: 'https://artify-art.vercel.app/' },
];

const Main = () => {
  const [darkMode, setDarkMode] = useState(true


  );
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleNav = () => {
    setIsNavOpen((prevNav) => !prevNav);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;
    const msgBody = `New message from ${name} (${email})\nSubject: ${subject}\nMessage: ${message}`;

    try {
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.REACT_APP_TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${process.env.REACT_APP_TWILIO_ACCOUNT_SID}:${process.env.REACT_APP_TWILIO_AUTH_TOKEN}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
          To: process.env.REACT_APP_ADMIN_PHONE_NUMBER,
          Body: msgBody,
        }).toString(),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ease-in-out ${darkMode ? 'bg-gray-900 text-slate-300' : 'bg-white text-gray-900'} px-4 md:px-8 lg:px-20 mx-auto`}>
  <header className="fixed top-0 left-0 right-0 z-10 bg-opacity-90 backdrop-blur-sm transition-colors duration-500 ease-in-out">
    <nav className=" lg:ml-10 md:ml-5 flex justify-between items-center py-3">
      <div className="flex items-center space-x-2">
        <Logo />
        <h1 className="text-2xl font-bold">Hanamaraddi B</h1>
      </div>
      <div className="hidden md:flex items-center space-x-4 lg:space-x-6 lg:mr-10">
        <a href="#about" className="hover:underline transition-colors duration-500 ease-in-out">About</a>
        <a href="#projects" className="hover:underline transition-colors duration-500 ease-in-out">Projects</a>
        <a href="#contact" className="hover:underline transition-colors duration-500 ease-in-out">Contact</a>
        <button onClick={toggleDarkMode} className={`p-2 rounded-full transition-colors duration-500 ease-in-out ${darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-slate-300'}`}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      <button onClick={toggleNav} className="md:hidden p-2 mr-3">
        {isNavOpen ? <X size={20} /> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>}
      </button>
    </nav>
    {isNavOpen && (
      <div className="md:hidden flex flex-col items-center space-y-4 bg-opacity-90 backdrop-blur-sm p-4">
        <a href="#about" className="hover:underline">About</a>
        <a href="#projects" className="hover:underline">Projects</a>
        <a href="#contact" className="hover:underline">Contact</a>
        <button onClick={toggleDarkMode} className={`p-2 rounded-full transition-colors duration-500 ease-in-out ${darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-slate-300'}`}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    )}
  </header>


      <main className="container mx-auto pt-20">
        {/* About Section */}
        <section id="about" className="py-20">
          <h2 className="text-4xl font-bold mb-4 transition-colors duration-500 ease-in-out">About Me</h2>
          <p className="text-lg mb-4 transition-colors duration-500 ease-in-out">
            I'm Hanamaraddi Bhandi, a Computer Science and Engineering student passionate about modern web development. My expertise lies in technologies like React.js, Node.js, and MySQL, with a focus on creating user-friendly and efficient applications.
          </p>
          <p className="text-lg mb-4 transition-colors duration-500 ease-in-out">
            I have worked on several projects, including "Artify," a platform for managing artworks, and a "Blood Bank Management System" for efficient blood donation management. I have also built "AgriChain," a decentralized application aimed at farmers and consumers for buying and selling agricultural products.
          </p>
          <p className="text-lg mb-4 transition-colors duration-500 ease-in-out">
            In addition to my academic projects, I gained industry experience during my internship at MotionCut, where I enhanced my web development skills. I actively participate in hackathons and enjoy solving data structure and algorithm problems.
          </p>
          <p className="text-lg transition-colors duration-500 ease-in-out">
            When I'm not working, I enjoy playing table tennis and drawing. I'm always keen on learning and applying new technologies to solve  problems.
          </p>
        </section>


        {/* Projects Section */}
        <section id="projects" className="py-20">
          <h2 className="text-4xl font-bold mb-8 transition-colors duration-500 ease-in-out">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className={`rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 hover:shadow-white' : 'hover:shadow-gray-900'}`}>
                <img src={project.image} alt={project.title} className={`w-full h-48 object-cover ${darkMode ? 'glow-effect' : ''}`} />
                <div className={`p-6 transition-colors duration-500 ease-in-out ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-xl font-semibold mb-2 relative transition-colors duration-500 ease-in-out">{project.title}</h3>
                  <p className="text-sm transition-colors duration-500 ease-in-out">{project.description}</p>
                  <div className="flex space-x-4 mt-2">
                    <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                      <button className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'} transition-colors duration-300`}>Source Code</button>
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <button className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'} transition-colors duration-300`}>Demo</button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


       {/* Contact Section */}
       <section id="contact" className="py-20">
          <h2 className="text-4xl font-bold mb-4 transition-colors duration-500 ease-in-out">Contact Me</h2>
          <form onSubmit={handleSubmit} className={`max-w-lg mx-auto p-6 border rounded-md shadow-lg transition-colors duration-500 ease-in-out ${darkMode ? 'dark:bg-gray-800' : 'bg-slate-100 border-gray-300'}`}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className={`w-full p-2 border rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} transition-colors duration-500 ease-in-out`} />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className={`w-full p-2 border rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} transition-colors duration-500 ease-in-out`} />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold">Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required className={`w-full p-2 border rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} transition-colors duration-500 ease-in-out`} />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold">Message</label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} required className={`w-full p-2 border rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} transition-colors duration-500 ease-in-out`} rows="4" />
            </div>
            <button type="submit" className={`w-full py-2 rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-300 hover:bg-gray-400'} transition-colors duration-300`}>
              Send Message
            </button>
          </form>
        </section>
      </main>

      <div className="flex justify-center space-x-4">
        <a href="https://github.com/Hanamaraddi17" target="_blank" rel="noopener noreferrer">
          <Github size={30} />
        </a>
        <a href="https://www.linkedin.com/in/hanamaraddi/" target="_blank" rel="noopener noreferrer">
          <Linkedin size={30} />
        </a>
        <a href="mailto:hanamaraddibb@gmail.com">
          <Mail size={30} />
        </a>
      </div>
      <footer className="bg-opacity-90 backdrop-blur-sm p-10    text-center transition-colors duration-500 ease-in-out">
        <p className='text-lg'>© 2024 Hanamaraddi Bhandi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Main;
