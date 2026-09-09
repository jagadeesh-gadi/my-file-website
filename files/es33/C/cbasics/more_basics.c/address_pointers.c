#include <stdio.h>

int main() {
    int a = 10;
    int *p;
    p = &a;

   
    printf("Value of a: %d\n", *p);  
    printf("Address of a: %p\n", p);  
}
