#include<stdio.h>
int main(){
    int n,ch;
     printf("enter n value :");
    scanf("%d",&n);
   printf("Enter denomination (100, 50, 20, 10, 5, 2, 1): ");
  scanf("%d",&ch);
  
    switch(ch){
         default:
         printf("invlid values ");
        
         case 100:
         int h=n/100;
         printf("hunder values %d\n: ",h);
         n=n%100;
        
         case 50:
         h=n/50;
         printf("fifty values %d\n: ",h);
         n=n%50;
        
         case 20:
         h=n/20;
         printf("twenty values %d\n: ",h);
         n=n%20;
         
         case 10:
          h=n/10;
         printf("tens values %d\n: ",h);
         n=n%10;
         
         case 5:
         h=n/100;
         printf("five values %d\n: ",h);
         n=n%5;
        
         case 2:
          h=n/2;
         printf("two values %d\n: ",h);
         n=n%2;
         case 1:
         h=n/1;
         printf("ones values %d\n: ",h);
         n=n%1;
         break;
    }
}