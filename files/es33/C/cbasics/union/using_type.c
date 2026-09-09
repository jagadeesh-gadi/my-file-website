#include <stdio.h>
typedef struct

{
    int id;
    float f;
    char c;
} senor_t;

void display(senor_t s)
{
    printf("%d\n", s.id);
    printf("%.3f\n", s.f);
    printf("%c\n", s.c);
}

int main()
{
    senor_t s = {101, 80.90, 'a'};
    display(s);
    return 0;
}