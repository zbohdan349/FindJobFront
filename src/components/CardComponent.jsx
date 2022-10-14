import { Card, Image, Text, Badge, Button, Group, Divider } from "@mantine/core";

export const CardComponent = (props) => {
  const {image, title, price, companyName, desc} = props;

  return (
    <Card className='bg-additional-color border-0' shadow="sm" p="lg" radius="md" withBorder>
      <Group position="apart" className="pb-4">
        <Text className='text-text-color text-lg' weight={500}>{title}</Text>
        <Badge className='bg-gray-300 text-lg text-slate-500' >
          {price}
        </Badge>
      </Group>
      <Divider />
      <Card.Section className='flex justify-between items-center px-5 pb-4 pt-4' component="a" href="https://mantine.dev/">
        <div className="w-[65%]  h-[80px] rounded-md">
        <img
          src={image}  
          alt="Norway"
          className="w-full h-full object-cover rounded-md"
        />
        </div>
        
        <p className="max-w-[140px] text-2xl text-text-color pl-2 truncate">{companyName}</p> 
      </Card.Section>



      <Text size="sm" className='text-text-color'>
        {desc}
        
      </Text>

      <Button className='w-full mt-2 hover:bg-hover-color transition-all'>
        Перейти до вакансії
      </Button>
    </Card>
  );
};
