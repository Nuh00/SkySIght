import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Header from "../auth/header";

interface CardWrapperFormProps {
  children: React.ReactNode;
  headerLabel: string;
}

function CardWrapperJob({ children, headerLabel }: CardWrapperFormProps) {
  return (
    <Card className="flex flex-col w-full h-[750px] shadow-md bg-opacity/90 ">
      <CardHeader className="text-white">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="flex-1">{children}</CardContent>
    </Card>
  );
}

export default CardWrapperJob;
