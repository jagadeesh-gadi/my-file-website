#include<stdio.h>
void swap(int *a,int *b){
    *a=*a ^ *b;
    *b=*a ^ *b;
    *a=*a ^ *b;

}
int main(){
    
    int x,y;
 printf("enter values to swap = ");
 scanf("%d %d",&x,&y);

 swap(&x,&y);
 printf("after swaping of number  == %d %d\n",x,y);
 return 0;
}

