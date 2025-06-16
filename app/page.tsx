"use client";

import { ThemeSwitch } from "@/components/theme-switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import InputNumber from "@/components/ui/input-number";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface DrawerState {
  isOpen?: boolean;
  position?: "bottom" | "right" | "top" | "left";
}

export default function Home() {
  const form = useForm<{ name?: string; count?: number }>();

  const [drawer, setDrawer] = useState<DrawerState>();

  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center">
      <div className="w-full h-14 sticky top-0 z-10 bg-background border-b flex justify-between items-center px-5">
        <h1 className="font-semibold">Next Js + ShadCN</h1>
        <ThemeSwitch />
      </div>
      <div className="w-full max-w-7xl flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-3">
          <Label>Button</Label>
          <div className="flex flex-wrap gap-3">
            <Button>default</Button>
            <Button variant="destructive">destructive</Button>
            <Button variant="ghost">ghost</Button>
            <Button variant="link">link</Button>
            <Button variant="outline">outline</Button>
            <Button variant="secondary">secondary</Button>
            <Button isLoading>loading</Button>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="flex flex-col gap-3">
          <Label>Alert</Label>
          <div className="flex flex-col gap-3">
            <Alert>
              <AlertTitle>Default</AlertTitle>
              <AlertDescription>description</AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertTitle>Destructive</AlertTitle>
              <AlertDescription>description</AlertDescription>
            </Alert>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="flex flex-col gap-3">
          <Label>Card</Label>

          <div className="flex flex-wrap gap-3">
            <Card className="w-96">
              <CardHeader>
                <CardTitle>Title</CardTitle>
                <CardDescription>Description</CardDescription>
              </CardHeader>
              <CardContent>Content</CardContent>
              <CardFooter className="flex gap-3 border-t">
                <Button>Button</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="flex flex-col gap-3">
          <Label>Checkbox</Label>

          <div className="flex flex-col gap-3 p-3">
            <Checkbox.WithLabel label="Kacang" />

            <Checkbox.Group
              horizontalLabel
              label="Group"
              items={[
                { label: "Cat", value: "cat" },
                { label: "Dog", value: "dog" },
              ]}
            />
          </div>
        </div>

        <Separator className="my-5" />

        <div className="flex flex-col gap-3">
          <Label>Input</Label>

          <div className="w-full max-w-96 flex flex-col gap-3 p-3">
            <Input.WithRHFControl
              isRequired
              label="Name"
              control={form.control}
              name="name"
              placeholder="Input name"
            />

            <InputNumber
              horizontalLabel
              label="Price"
              placeholder="0"
              leftContent="IDR"
              rightContent="/Day"
              isInvalid
              errorMessage="Please fill out this field. Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />

            <InputNumber.WithRHFControl
              isRequired
              label="Price"
              control={form.control}
              name="count"
            />

            <Button onClick={form.handleSubmit(console.log)}>Submit</Button>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="flex flex-col gap-3">
          <Label>Drawer</Label>

          <div className="flex flex-wrap gap-3 p-3">
            <Drawer
              direction={drawer?.position}
              open={drawer?.isOpen}
              onClose={() => setDrawer({})}
            >
              <Button onClick={() => setDrawer({ isOpen: true })}>Bottom</Button>

              <Button onClick={() => setDrawer({ isOpen: true, position: "left" })}>Left</Button>

              <Button onClick={() => setDrawer({ isOpen: true, position: "top" })}>Top</Button>

              <Button onClick={() => setDrawer({ isOpen: true, position: "right" })}>Right</Button>

              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Title</DrawerTitle>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero saepe ipsum fugit incidunt
          vel fugiat quibusdam tempore ab reprehenderit. Perferendis quidem aspernatur, aliquid iste
          assumenda veritatis in maiores quos explicabo molestiae vero voluptatem labore rem, saepe
          optio blanditiis accusantium doloribus nostrum quam sit ratione beatae. Illo expedita
          distinctio cum, inventore asperiores rem quasi molestias illum fugiat id alias
          exercitationem dignissimos vero, ipsum maxime veritatis tempore. Qui, autem. Adipisci odit
          repellendus rerum modi voluptates doloribus maxime neque harum vero vel, atque recusandae
          vitae et repudiandae obcaecati suscipit maiores fugit, dolor natus architecto eos!
          Quisquam eligendi alias molestias ipsum ex vel. Aut.
        </p>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni dignissimos eum impedit
          odit necessitatibus commodi tenetur dicta molestiae enim ipsum? Obcaecati, repellat
          repellendus! Tempore possimus accusantium maxime soluta eaque quos adipisci officiis
          excepturi, corrupti saepe? Vel beatae hic modi, consequatur velit distinctio. Odio tempore
          distinctio laborum dolorem cum quam voluptas, placeat quas quia velit saepe sunt deserunt
          nostrum. Distinctio beatae eum aliquid, modi obcaecati exercitationem, quos voluptatum,
          nesciunt praesentium omnis autem tenetur accusamus doloribus? Dicta fuga voluptatem quasi,
          minus quisquam nobis praesentium perferendis velit dolor alias ex modi asperiores porro
          possimus ut. Blanditiis quidem perspiciatis voluptatem reprehenderit aspernatur odio
          fugiat.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nobis reiciendis commodi
          quis maiores odit velit aut vitae quae itaque delectus dicta enim, cupiditate optio,
          blanditiis, unde ea animi? Fugiat magnam doloribus fugit! Hic dolorem consequuntur rerum
          qui, impedit doloremque animi nam perferendis eius provident commodi tenetur temporibus
          voluptate culpa voluptates! Quasi voluptate corrupti iste autem cupiditate, fugit
          obcaecati iusto, debitis omnis officiis optio in aspernatur! Eos assumenda eveniet, quo ut
          blanditiis iste similique officia, eius quibusdam, error officiis sapiente consequatur
          molestias velit fugit doloremque temporibus esse consectetur? Sed assumenda explicabo quam
          error saepe alias officiis dolores soluta placeat possimus.
        </p>
      </div>
    </div>
  );
}
