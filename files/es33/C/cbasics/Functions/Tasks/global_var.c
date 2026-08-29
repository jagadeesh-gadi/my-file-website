#include <stdio.h>
int count =100;
void display(){
    printf("disply () count == %d\n",count);
    count++;

}
int main()
{
    printf("main () count == %d \n",count);
    display();
    printf("display () count == %d\n",count);
    return 0;
}