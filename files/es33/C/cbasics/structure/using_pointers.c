#include<stdio.h>
#include<stdio.h>

struct device{
 int id;
 char name[20];
 int *data;
}d1;

int main(){
       int value =1000;
	struct device d1= {100,"ravi",&value};
        
	struct device *p =&d1;

	printf("id : %d\n",p->id);
	  printf("name : %s\n",p->name);
	    printf("data : %d\n",*(p->data));

}
