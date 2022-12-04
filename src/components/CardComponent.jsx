import { Card, Text, Badge, Button, Group, Divider } from "@mantine/core";
import { Link } from "react-router-dom";

export const CardComponent = (props) => {
  const {id,image, title, price, companyName, desc, categories} = props;

  return (
    <Card className='bg-additional-color border-0' shadow="sm" p="lg" radius="md" withBorder>
      <Group position="apart" className="pb-4">
        <Text className='text-text-color text-lg' weight={500}>{title}</Text>
        <Badge className='bg-gray-300 text-lg text-slate-500' >
          {price +"$"}
        </Badge>
      </Group>
      <Divider />
      <Card.Section className='flex items-center px-5 pb-4 pt-4' component="a">
        <div className="w-[100px]  h-[100px] rounded-md">
        <img
          src={image}  
          alt="Norway"
          className="w-full h-full object-cover rounded-md"
        />
        </div>
        
        <p className="max-w-[140px] text-2xl text-text-color pl-2 ">{companyName}</p> 
      </Card.Section>

      {categories.map( category =>{
        return(
          <Badge key={category.id} className='bg-gray-300 text-slate-500 m-1' >
            {category.name}
          </Badge>
        )
      })}

      <Text size="sm" className='text-text-color'>
        {desc}
      </Text>

      <Button className='w-full mt-2 hover:bg-hover-color transition-all'>
      <Link to={`vacancies/${id}`}>Перейти до вакансії </Link>
      </Button>
    </Card>
  );
};
