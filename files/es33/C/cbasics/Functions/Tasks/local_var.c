#include <stdio.h>
void display(){
    int x=20;
    printf("display () :: %d\n",x);
}
int main()
{
    int x=10;
    printf("main() : %d\n",x);
    display(x);
    printf("main() : %d\n",x);
    return 0;
}