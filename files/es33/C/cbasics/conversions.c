 #include<stdio.h>
 #define Pi 3.14
 
 int main(){
   char str[30];
   printf("%s",str);


   /* decimal to octa converison*/
   int a=10;
   printf("the decimal %d = %o \n",a,a);

   /* decimal to hexadecimal converison*/
   printf("the decimal %d = %x \n",a,a);

   //converions using the ASCII values and also charters 
   printf("normal value :: %d\n",100);
   printf("octa value :: %o\n",100);
   printf("hexa value :: %x\n",100);
   printf("chareters :: %c\n",'A');
   printf("string value :: %s\n","linux");
   printf("floating value :: %f\n",Pi);



 }