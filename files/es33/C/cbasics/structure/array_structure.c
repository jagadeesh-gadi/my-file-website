#include <stdio.h>
#define size 2
struct senor
{
    int i;
    char name[20];
    char grade;
    float marks;
};

int main()
{
    struct senor s[size];
    struct senor *p = s;
    for (int i = 0; i < size; i++)
    {
        printf("\nEnter sensor values %d:\n", i + 1);
        printf("Enter ID: ");
        scanf("%d", &p[i].i);
        printf("Enter Name: ");
        scanf("%19s", p[i].name);
        printf("Enter Grade: ");
        scanf(" %c", &p[i].grade);
        printf("Enter Marks: ");
        scanf("%f", &p[i].marks);
    }
    printf("\n=============== details =======================\n");
    for (int i = 0; i < size; i++)
    {
        printf("\nenter sensor  values :%d \n", i + 1);
        printf("id :: %d\n", p[i].i);
        printf("name :: %s\n", p[i].name);
        printf("grade :: %c\n", p[i].grade);
        printf("marks :: %f\n", p[i].marks);
    }
    int max = 0;
    printf("\n==========highest id and marks ==============\n");
    for (int i = 1; i < size; i++)
    {
        if (p[i].marks > p[max].marks)
        {
            max = i;
        }
    }
    printf("highest  marks id :: %i\n", p[max].i);
    printf("highest  marks :: %2f\n", p[max].marks);
    return 0;
}