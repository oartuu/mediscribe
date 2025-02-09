import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/logo.png"
            alt="logo"
            className=""
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold text-gray-800">
            Medi
            <strong className="font-bold text-[#65D1BF] ">Scribe</strong>
          </h1>
        </div>

        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
          <Avatar>
            <AvatarImage
              src="https://media.discordapp.net/attachments/1337596726562783265/1338025093862785095/DALLE_2025-02-09_02.53.33_-_A_digital_illustration_of_a_happy_female_doctor._She_has_a_warm_smile_bright_eyes_and_wears_a_white_lab_coat_with_a_stethoscope_around_her_neck._Her.webp?ex=67a99479&is=67a842f9&hm=83e95620c93c9b423b1c5b8985f666f6ebffc2c9bf2f4619c2816c8cb70b8c0c&=&format=webp&width=671&height=671"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>Dr. Silva Rodrigues</span>
        </button>
      </div>
    </header>
  );
}
