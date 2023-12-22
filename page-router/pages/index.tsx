import { useState } from "react";
import type { MouseEventHandler } from "react";
import { random } from 'lodash'
import { LazyImage } from "@/components/LazyImage";
import { Inter } from 'next/font/google'
import Head from "next/head";

const inter = Inter({ subsets: ['latin'] })

const initialImages: IFoxImageItem[] = []

export default function Home() {
  const [images, setImages] = useState<Array<IFoxImageItem>>(initialImages)

  const addNewFox: MouseEventHandler<HTMLButtonElement> = () => {
    const newImageItem: IFoxImageItem = {
      url: `https://randomfox.ca/images/${random(1, 123)}.jpg`,
      id: crypto.randomUUID()
    }
    setImages(prevState => [...prevState, newImageItem])
    window.plausible('add_fox')
  }

  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>
      <Head>
        <title>Fox Images</title>
      </Head>
      <h1 className='text-3xl font-bold'>Random Fox</h1>
      <button
        onClick={addNewFox}
        className='w-[320px] bg-indigo-600 rounded p-[5px] text-white'
      >
        Add new Fox
      </button>
      <section className='grid grid-cols-2'>
        {
          images.map(({url, id}) => (
            <div key={id} className='p-3'>
              <LazyImage
                className='rounded shadow-lg bg-gray-300 object-cover w-[320px] h-[320px]'
                src={url}
                onLazyLoad={(img) => console.log(img)}
                alt='Fotografia de un zorro'
                width={320}
                height={320}
              />
            </div>
          ))
        }
      </section>
    </main>
  )
}
