import { TMyCourse } from "@/components/Profile/static/profile.type";
import { getPurchasedCourse } from "@/utils/server-api";
import { cookies } from "next/headers";
import Image from "next/image";



export default async function MyCoursesPage() {
    
    const cookieStore = cookies();
    const id = cookieStore.get('id')?.value;
    let result=await getPurchasedCourse(id??0)
    let courses:TMyCourse[]=result?.data;

  return (
    <div className="min-h-screen bg-[#050f1e] text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">🎓 My Courses</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-[#3A2768] to-[#881D69] hover:scale-105 transition-transform duration-300"
          >
            <div className="relative w-full h-48">
              <Image
                src={course.image_url}
                alt={course.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              <p className="text-sm text-gray-200">{course.description?.slice(0,200)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
