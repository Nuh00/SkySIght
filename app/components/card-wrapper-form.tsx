import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Header from "./auth/header";

interface CardWrapperFormProps {
  children: React.ReactNode;
  headerLabel: string;
}

function CardWrapperForm({ children, headerLabel }: CardWrapperFormProps) {
  return (
    <Card className="flex flex-col w-full h-[600px] shadow-md bg-black">
      <CardHeader className="text-white">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="flex-1">{children}</CardContent>
    </Card>
  );
}

export default CardWrapperForm;
