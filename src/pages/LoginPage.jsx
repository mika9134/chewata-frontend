// import React, { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import { Eye, EyeOff } from "lucide-react";
// import { toast } from "react-hot-toast";
// import { Link } from "react-router-dom";
// import Button from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import Card from "../components/ui/Card";
// import LogoSrc from "../assets/logo/Chewata.svg?react";

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const { login, isLoggingIn } = useAuthStore();

//   const validateForm = () => {
//     if (!formData.email.trim()) {
//       toast.error("Email is required");
//       return false;
//     }
//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       toast.error("Please enter a valid email");
//       return false;
//     }
//     if (!formData.password) {
//       toast.error("Password is required");
//       return false;
//     }
//     if (formData.password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       login(formData);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-surface-primary to-surface-secondary flex items-center justify-center p-4">
//       {/* Background Decoration */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
//       </div>

//       {/* Login Card */}
//       <Card className="relative z-10 w-full max-w-md shadow-xl" padding="lg">
//         {/* Logo & Header */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <div className="p-3 rounded-xl bg-primary-light">
//               <LogoSrc className="fill-primary h-8 w-8" />
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome Back</h1>
//           <p className="text-text-secondary">Sign in to continue to Chewata</p>
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email Input */}
//           <div>
//             <label className="block text-sm font-medium text-text-primary mb-2">
//               Email Address
//             </label>
//             <Input
//               type="email"
//               placeholder="you@example.com"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               disabled={isLoggingIn}
//               size="md"
//             />
//           </div>

//           {/* Password Input */}
//           <div>
//             <label className="block text-sm font-medium text-text-primary mb-2">
//               Password
//             </label>
//             <Input
//               type={showPassword ? "text" : "password"}
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               disabled={isLoggingIn}
//               rightIcon={
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="hover:opacity-70 transition-opacity"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-4 h-4" />
//                   ) : (
//                     <Eye className="w-4 h-4" />
//                   )}
//                 </button>
//               }
//               size="md"
//             />
//           </div>

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             variant="primary"
//             size="lg"
//             isLoading={isLoggingIn}
//             disabled={isLoggingIn}
//             className="w-full"
//           >
//             {isLoggingIn ? "Signing in..." : "Sign In"}
//           </Button>
//         </form>

//         {/* Divider */}
//         <div className="relative my-6">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-border"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-surface-secondary text-text-tertiary">
//               New to Chewata?
//             </span>
//           </div>
//         </div>

//         {/* Sign Up Link */}
//         <Link to="/signup" className="block">
//           <Button
//             type="button"
//             variant="outline"
//             size="lg"
//             className="w-full"
//           >
//             Create Account
//           </Button>
//         </Link>

//         {/* Demo Credentials Hint */}
//         <p className="text-xs text-text-tertiary text-center mt-6">
//           Demo: test@example.com / password123
//         </p>
//       </Card>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Sun, Moon, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import LogoSrc from "../assets/logo/Chewata.svg?react";

const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2076&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1452022582910-21a415ff69a5?q=80&w=2070&auto=format&fit=crop"
];

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) login(formData);
  };

  return (
    /* Ambient Purple Background */
    <div className="min-h-screen bg-gradient-to-br from-[#E9D5FF] via-[#F3E8FF] to-[#D8B4FE] dark:from-[#1A0B2E] dark:via-[#2D134D] dark:to-[#140524] transition-colors duration-500 flex items-center justify-center p-4 sm:p-8 font-sans">
      
      {/* Transparent Glass Split Container */}
      <div className="w-full max-w-[1100px] min-h-[650px] flex flex-col md:flex-row bg-white/30 dark:bg-[#2A1B38]/40 backdrop-blur-2xl rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(123,44,191,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/50 dark:border-purple-500/20 transition-colors duration-500 relative">
        
        {/* --- LEFT PANEL: Carousel --- */}
        <div className="hidden md:flex w-[45%] relative overflow-hidden bg-black group">
          <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-center text-white">
            <div className="flex items-center gap-2 font-bold text-2xl tracking-widest">
              <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-md">
                <LogoSrc className="fill-white h-6 w-6" />
              </div>
              AMU
            </div>
            <Link to="/" className="text-sm font-medium flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              Back to website <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div 
            className="flex w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {CAROUSEL_IMAGES.map((src, index) => (
              <div key={index} className="w-full h-full flex-shrink-0 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B0764]/90 via-purple-900/30 to-black/30 z-10 mix-blend-multiply" />
                <img src={src} alt={`Slide ${index + 1}`} className={`w-full h-full object-cover transition-transform duration-[5000ms] ${currentSlide === index ? 'scale-105' : 'scale-100'}`} />
              </div>
            ))}
          </div>

          <div className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center justify-end text-white px-8 text-center">
            <h2 className="text-[28px] leading-tight font-light tracking-wide mb-8 drop-shadow-lg">
              Capturing Moments...<br />Creating Memories
            </h2>
            <div className="flex justify-center items-center gap-2">
              {CAROUSEL_IMAGES.map((_, index) => (
                <button key={index} onClick={() => setCurrentSlide(index)} className={`h-1.5 rounded-full transition-all duration-500 ease-out ${currentSlide === index ? "w-8 bg-white dark:bg-[#D8B4FE]" : "w-4 bg-white/40 hover:bg-white/70"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT PANEL: Transparent Purple Form --- */}
        <div className="w-full md:w-[55%] p-8 sm:p-14 lg:p-16 flex flex-col justify-center relative">
          
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="absolute top-8 right-8 p-2 rounded-full text-purple-800 dark:text-purple-200 hover:bg-white/40 dark:hover:bg-purple-800/40 transition-colors backdrop-blur-md">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="max-w-md w-full mx-auto">
            <h1 className="text-4xl font-semibold text-purple-950 dark:text-white tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-purple-800/70 dark:text-purple-200/70 mb-8">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-900 dark:text-purple-200 font-bold underline underline-offset-4 hover:text-[#7B2CBF] transition-colors">
                Sign up
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isLoggingIn}
                  className="w-full bg-white/40 dark:bg-[#1A0B2E]/50 border border-purple-200 dark:border-purple-500/30 rounded-xl px-4 py-3.5 text-sm text-purple-950 dark:text-white placeholder-purple-800/50 dark:placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-[#7B2CBF] focus:border-transparent transition-all backdrop-blur-sm"
                />
              </div>

              <div className="relative space-y-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isLoggingIn}
                  className="w-full bg-white/40 dark:bg-[#1A0B2E]/50 border border-purple-200 dark:border-purple-500/30 rounded-xl px-4 py-3.5 text-sm text-purple-950 dark:text-white placeholder-purple-800/50 dark:placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-[#7B2CBF] focus:border-transparent transition-all backdrop-blur-sm"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[14px] text-purple-700/60 dark:text-purple-300/60 hover:text-purple-900 dark:hover:text-white transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-3 pt-2 pb-4">
                <div className="relative flex items-center">
                  <input type="checkbox" id="remember" className="peer w-4 h-4 cursor-pointer appearance-none border border-purple-300 dark:border-purple-500/50 rounded bg-white/50 dark:bg-black/20 checked:bg-[#7B2CBF] checked:border-[#7B2CBF] transition-colors" />
                  <svg className="absolute left-0 w-4 h-4 p-0.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <label htmlFor="remember" className="text-xs text-purple-900 dark:text-purple-200 cursor-pointer select-none">
                  Remember me
                </label>
              </div>

              <button type="submit" disabled={isLoggingIn} className="w-full bg-[#7B2CBF] hover:bg-[#6824A3] text-white rounded-xl py-3.5 font-medium transition-all transform active:scale-[0.98] disabled:opacity-70 shadow-[0_4px_14px_rgba(123,44,191,0.39)]">
                {isLoggingIn ? "Logging in..." : "Log in"}
              </button>
            </form>

            {/* Social Logins */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-purple-200/50 dark:bg-purple-500/20"></div>
              <span className="text-xs text-purple-800/60 dark:text-purple-300/60">Or continue with</span>
              <div className="flex-1 h-px bg-purple-200/50 dark:bg-purple-500/20"></div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white/40 dark:bg-[#1A0B2E]/50 border border-purple-200 dark:border-purple-500/30 hover:bg-white/60 dark:hover:bg-purple-800/40 rounded-xl py-3 text-sm font-medium text-purple-950 dark:text-purple-100 transition-colors backdrop-blur-sm">
                 {/* Google SVG */}
                 <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-white/40 dark:bg-[#1A0B2E]/50 border border-purple-200 dark:border-purple-500/30 hover:bg-white/60 dark:hover:bg-purple-800/40 rounded-xl py-3 text-sm font-medium text-purple-950 dark:text-purple-100 transition-colors backdrop-blur-sm">
                {/* Apple SVG */}
                <svg className="w-5 h-5 dark:fill-white" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.68.727-1.338 2.118-1.144 3.494 1.34.104 2.587-.468 3.431-1.482z" />
                </svg>
                Apple
              </button>
            </div>
            
            <p className="text-xs text-purple-800/60 dark:text-purple-400/60 text-center mt-6">
              Demo: test@example.com / password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;