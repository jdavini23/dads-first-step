import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Dad&apos;s First Step
        </h1>
        <p className="text-center text-xl mb-4">
          Your companion in the journey of fatherhood
        </p>
      </div>
    </main>
  )
}
