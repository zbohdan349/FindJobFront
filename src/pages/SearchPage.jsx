import { MainLayout } from "../layout/MainLayout"
import { FilterForm } from "../components/FilterForm"

export const SearchPage = ( ) => {
  return (
    <MainLayout>
        <div className="container mx-auto text-text-color">
            <div className="container py-2 my-2 border-b-2 border-text-color text-4xl">Вакансії</div>
        </div>
        <div class="flex flex-row text-text-color text-2xl justify-center">
            <div className="basis-1/4 md:basis-2/4">01</div>
            <div className="basis-1/4 md:basis-1/4">
                <FilterForm/>
            </div>
        </div>
    </MainLayout>
  )
}