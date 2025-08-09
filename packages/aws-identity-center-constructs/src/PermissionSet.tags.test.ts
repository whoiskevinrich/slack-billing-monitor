
import { describe, it, expect } from "vitest";
import { PermissionSetProps } from "./PermissionSet";

describe("PermissionSetProps tags property", () => {
    it("should accept an array of tag objects", () => {
        const tags: Array<Record<string, string>> = [
            { key1: "value1", key2: "value2" },
            { keyA: "valueA" }
        ];
        const props: PermissionSetProps = {
            instanceArn: "arn:aws:sso:::instance/ssoins-1234567890123456/",
            name: "TestPermissionSet",
            tags,
        };
        expect(props.tags).toBe(tags);
    });

    it("should allow tags to be undefined", () => {
        const props: PermissionSetProps = {
            instanceArn: "arn:aws:sso:::instance/ssoins-1234567890123456/",
            name: "TestPermissionSet",
        };
        expect(props.tags).toBeUndefined();
    });
});
