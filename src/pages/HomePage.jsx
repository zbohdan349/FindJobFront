import { CardComponent } from "../components/CardComponent"
import { MainLayout } from "../layout/MainLayout"

export const HomePage = ( ) => {
  return (
    <MainLayout>
      <div className="w-full flex justify-center pt-7
       max-w-7xl">
        <div className="max-w-[320px]">
          <CardComponent 
            image="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            title='Full stack developer'
            price='1500$'
            companyName='Epam'
            desc='With Fjord Tours you can explore more of the magical fjord landscapes
            with tours and activities on and around the fjords of Norway'
          />
        </div>
      </div>
      
        
    </MainLayout>
  )
}