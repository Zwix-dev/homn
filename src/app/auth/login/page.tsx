
import { LoginForm } from "@/components/auth/login"
export default function Page() {
  return (

    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div>
        <img src="/icon.jpg" alt="Logo" className="w-32 h-32 mb-4 rounded-2xl opacity-40" />
      </div>  
      <LoginForm />
    </div>


  )
}
