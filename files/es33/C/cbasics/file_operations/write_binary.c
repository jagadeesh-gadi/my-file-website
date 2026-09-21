#include <stdio.h>

struct Student
{
    int id;
    char name[50];
    float marks;
};

int main()
{
    struct Student s;

    FILE *fp = fopen("some.bin", "wb");

    if (fp == NULL)
    {
        printf("File cannot be opened\n");
        return 1;
    }

    printf("Enter ID: ");
    scanf("%d", &s.id);

    printf("Enter name: ");
    scanf("%s", s.name);

    printf("Enter marks: ");
    scanf("%f", &s.marks);

    fwrite(&s, sizeof(s), 1, fp);

    fclose(fp);

    printf("Data written successfully\n");

    return 0;
}