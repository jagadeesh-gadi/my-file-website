#include <stdio.h>
struct pointers
{
    int roll;
    char name[20];
    float marks;
};

int main()
{
    int n, i;

    printf("enter  number :: ");
    scanf("%d", &n);
    struct pointers m[n];
    for (i = 0; i < n; i++)
    {
        printf("enter nof of stduent :: %d \n", i + 1);
        scanf("%d", &m[i].roll);
        scanf("%s", m[i].name);
        scanf("%f", &m[i].marks);
    }
    for (i = 0; i < n; i++)
    {
        printf("after  nof of stduent :: %d \n", i + 1);
        printf("roll : %d\n", m[i].roll);
        printf("name : %s\n", m[i].name);
        printf("marks  :: %f\n", m[i].marks);
    }

    return 0;
}